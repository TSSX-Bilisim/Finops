import { logger } from "../utils/logger";
import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
};

export default errorHandler;
