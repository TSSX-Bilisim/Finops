import dotenv from "dotenv";

dotenv.config();

const {
  PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_SCHEMA,
  DISCOVERY_URL,
  DISCOVERY_API_TOKEN,
  NODE_ENV,
} = process.env;

export default {
  PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_SCHEMA,
  DISCOVERY_URL,
  DISCOVERY_API_TOKEN,
  NODE_ENV,
};
