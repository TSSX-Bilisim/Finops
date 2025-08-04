import axios, { AxiosInstance } from "axios";
import https from "https";
import config from "../config/config";
import { logger } from "./logger";

interface BMCDiscoveryConfig {
  baseURL: string;
  apiToken: string;
  timeout?: number;
  retryAttempts?: number;
}

interface BMCNode {
  nodeId: string;
  name: string;
  kind: string;
  [key: string]: any;
}

class BMCDiscoveryClient {
  private client: AxiosInstance;
  private retryAttempts: number;

  constructor(configParams: BMCDiscoveryConfig) {
    this.retryAttempts = configParams.retryAttempts || 3;

    // Create HTTPS agent that accepts self-signed certificates in development
    const httpsAgent = new https.Agent({
      rejectUnauthorized: process.env.NODE_ENV === "production", // Only reject in production
    });

    if (process.env.NODE_ENV !== "production") {
      logger.warn(
        "HTTPS agent configured to accept self-signed certificates for development"
      );
    }

    this.client = axios.create({
      baseURL: configParams.baseURL,
      timeout: configParams.timeout || 60000,
      httpsAgent: httpsAgent, // Use the custom HTTPS agent
      headers: {
        Authorization: configParams.apiToken.startsWith("Bearer ")
          ? configParams.apiToken
          : `Bearer ${configParams.apiToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        logger.info("BMC Discovery API Request", {
          method: config.method?.toUpperCase(),
          url: config.url,
          baseURL: config.baseURL,
        });
        return config;
      },
      (error) => {
        logger.error("BMC Discovery API Request Error", {
          error: error.message,
        });
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        logger.info("BMC Discovery API Response", {
          status: response.status,
          url: response.config.url,
          dataLength: JSON.stringify(response.data).length,
        });
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401) {
          logger.error("BMC Discovery API Authentication Error", {
            status: error.response.status,
            url: originalRequest.url,
          });
        } else if (
          error.response?.status >= 500 &&
          originalRequest._retry < this.retryAttempts
        ) {
          originalRequest._retry = (originalRequest._retry || 0) + 1;
          logger.warn("BMC Discovery API Server Error - Retrying", {
            attempt: originalRequest._retry,
            maxAttempts: this.retryAttempts,
            status: error.response.status,
            url: originalRequest.url,
          });

          // Exponential backoff
          const delay = Math.pow(2, originalRequest._retry) * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));

          return this.client.request(originalRequest);
        }

        logger.error("BMC Discovery API Error", {
          status: error.response?.status,
          message: error.message,
          url: originalRequest?.url,
        });

        return Promise.reject(error);
      }
    );
  }

  // Tek node'u getir - /data/nodes/{node_id}
  async getNode(nodeId: string): Promise<BMCNode | null> {
    try {
      const response = await this.client.get(`/data/nodes/${nodeId}`);
      logger.info("Successfully fetched single node", { nodeId });
      return response.data;
    } catch (error) {
      logger.error("Failed to fetch single node", { nodeId, error });
      return null;
    }
  }

  //get nodes with categories
  async getNodesWithCategories(): Promise<BMCNode[]> {
    logger.info("Getting nodes with categories");
    const response = await this.client.get("/taxonomy/nodekinds?format=info");
    logger.info("Nodes fetched with categories", {
      nodeCount: response.data.length,
    });
    return response.data;
  }

  async getNodeIds(nodeName: string): Promise<string[]> {
    const response = await this.client.get(`/data/kinds/${nodeName}`);

    logger.info("BMC API Raw Response Debug", {
      nodeName,
      isArray: Array.isArray(response.data),
      dataLength: response.data?.length,
      firstElementKeys: response.data?.[0]
        ? Object.keys(response.data[0])
        : null,
      firstElementKind: response.data?.[0]?.kind,
      firstElementCount: response.data?.[0]?.count,
      hasResults: !!response.data?.[0]?.results,
      resultsLength: response.data?.[0]?.results?.length,
    });

    // BMC Discovery API returns data in format: [{ results: [[id, name, ...], ...] }]
    // Extract node IDs from the results array (first element of each result)
    const nodeIds: string[] = [];
    if (
      response.data &&
      Array.isArray(response.data) &&
      response.data[0]?.results &&
      Array.isArray(response.data[0].results)
    ) {
      nodeIds.push(
        ...response.data[0].results.map((result: any[]) => result[0])
      );
    }

    logger.info("Node IDs fetched", {
      nodeName,
      nodeIds: nodeIds.length,
      apiResponseFormat: response.data?.[0]?.kind || "unknown",
      extractedIds: nodeIds.slice(0, 3), // Show first 3 IDs for debugging
    });
    return nodeIds;
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      // BMC Discovery API test endpoint'i
      const response = await this.client.get("/vault");
      if (response.status === 200) {
        logger.info("BMC Discovery health check passed");
        return true;
      } else {
        logger.error("BMC Discovery health check failed", {
          error: response.status,
        });
        return false;
      }
    } catch (error) {
      logger.error("BMC Discovery health check failed", { error });
      return false;
    }
  }
}

// BMC Discovery client instance'ı oluştur
export const bmcDiscoveryClient = new BMCDiscoveryClient({
  baseURL: config.DISCOVERY_URL || "https://192.168.60.168/api/v1.14",
  apiToken: config.DISCOVERY_API_TOKEN || "",
  timeout: 30000,
  retryAttempts: 3,
});

export default bmcDiscoveryClient;
