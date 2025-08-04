import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";
import helmet from "helmet";
import discoveryRoutes from "./routes/route";
import errorHandler from "./middlewares/errorHandler";
import { logger } from "./utils/logger";
import bmcDiscoveryClient from "./utils/bmcDiscovery";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  if (Object.keys(req.body).length > 0) {
    logger.info(`Request body: ${JSON.stringify(req.body)}`);
  }
  next();
});

app.use("/discovery", discoveryRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  bmcDiscoveryClient.healthCheck().then((isHealthy) => {
    if (isHealthy) {
      logger.info("BMC Discovery connection successful");
    } else {
      logger.warn("BMC Discovery connection failed");
    }
  });
  logger.info(`Server is running on port ${PORT}`);
});
