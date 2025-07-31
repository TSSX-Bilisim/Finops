import { Pool } from "pg";
import { config } from "./config";
import { logger } from "../utils/logger";


export const pool = new Pool({
  host: config.DB_HOST,
  port: Number(config.DB_PORT),
  database: config.DB_NAME,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
});

async function query(text: string, params: any[]) {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        logger.info('executed query', { text, duration, rows: res.rowCount });
        return res;
    } catch (err) {
        logger.error('error executing query', { error: err, text });
        throw err;
    }
}

async function createTable(tableName: string, tableDefinition: string) {
    const schema = config.DB_SCHEMA || 'public';
    
    // Create schema if it doesn't exist
    const createSchemaQuery = `CREATE SCHEMA IF NOT EXISTS ${schema}`;
    try {
        await query(createSchemaQuery, []);
        logger.info(`Schema ${schema} ensured`);
    } catch (err) {
        logger.error(`Error creating schema ${schema}`, { error: err, schema });
    }
    
    // Create table in the specified schema
    const createTableQuery = `CREATE TABLE IF NOT EXISTS ${schema}.${tableName} (${tableDefinition})`;
    try {
        await query(createTableQuery, []);
        logger.info(`Table ${schema}.${tableName} created successfully`);
    } catch (err) {
        logger.error(`Error creating table ${schema}.${tableName}`, { error: err, tableName, schema });
        throw err;
    }
}

async function createTables(tables: { name: string; definition: string }[]) {
    for (const table of tables) {
        await createTable(table.name, table.definition);
    }
}

// Helper function to sanitize table names and handle reserved keywords
function sanitizeTableName(nodeName: string): string {
    let tableName = nodeName.toLowerCase().replace(/[^a-z0-9_]/g, '_');
    
    // Handle PostgreSQL reserved keywords by adding prefix
    const reservedKeywords = ['group', 'user', 'order', 'table', 'index', 'view', 'key', 'value', 'type', 'data'];
    if (reservedKeywords.includes(tableName)) {
        tableName = `bmc_${tableName}`;
    }
    
    return tableName;
}

async function createNodeTable(nodeName: string, columns: { name: string; type: string }[]) {
    const sanitizedNodeName = sanitizeTableName(nodeName);
    const schema = config.DB_SCHEMA || 'public';
    
    // Convert column definitions to SQL format
    // Note: Standard columns are already included in the columns parameter
    const allColumns = columns.map(col => `${col.name} ${col.type}`).join(', ');
    
    await createTable(sanitizedNodeName, allColumns);
    
    // Updated_at otomatik güncelleme trigger'ı oluştur
    const triggerQuery = `
        CREATE OR REPLACE FUNCTION ${schema}.update_${sanitizedNodeName}_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = CURRENT_TIMESTAMP;
            RETURN NEW;
        END;
        $$ language 'plpgsql';
        
        DROP TRIGGER IF EXISTS update_${sanitizedNodeName}_updated_at ON ${schema}.${sanitizedNodeName};
        
        CREATE TRIGGER update_${sanitizedNodeName}_updated_at
            BEFORE UPDATE ON ${schema}.${sanitizedNodeName}
            FOR EACH ROW
            EXECUTE FUNCTION ${schema}.update_${sanitizedNodeName}_updated_at();
    `;
    
    try {
        await query(triggerQuery, []);
        logger.info(`Trigger for ${schema}.${sanitizedNodeName} created successfully`);
    } catch (err) {
        logger.error(`Error creating trigger for ${schema}.${sanitizedNodeName}`, { error: err, nodeName: sanitizedNodeName });
    }
}

async function upsertNodeData(nodeName: string, nodeId: string, data: Record<string, any>) {
    const sanitizedNodeName = sanitizeTableName(nodeName);
    const schema = config.DB_SCHEMA || 'public';
    const fullTableName = `${schema}.${sanitizedNodeName}`;
    
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = values.map((_, index) => `$${index + 2}`); // $1 nodeId için ayrıldı
    
    // UPSERT sorgusu (INSERT ... ON CONFLICT UPDATE)
    const upsertQuery = `
        INSERT INTO ${fullTableName} (node_id, ${columns.join(', ')})
        VALUES ($1, ${placeholders.join(', ')})
        ON CONFLICT (node_id) 
        DO UPDATE SET 
            ${columns.map((col, index) => `${col} = $${index + 2}`).join(', ')},
            updated_at = CURRENT_TIMESTAMP
        RETURNING *;
    `;
    
    try {
        const result = await query(upsertQuery, [nodeId, ...values]);
        logger.info(`Node ${nodeId} upserted in table ${fullTableName}`);
        return result.rows[0];
    } catch (err) {
        logger.error(`Error upserting node ${nodeId} in ${fullTableName}`, { error: err, nodeId, nodeName: sanitizedNodeName });
        throw err;
    }
}

pool.connect((err, client, release) => {
    if (err) {
        return logger.error('Error acquiring client', { error: err });
    }
    release();
});

    export default {
  query,
  createTable,
  createTables,
  createNodeTable,
  upsertNodeData,
};