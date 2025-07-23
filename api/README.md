# InfraWatch API Server

Modern Express.js API server for InfraWatch infrastructure monitoring platform.

## Features

- **Express.js**: Fast, unopinionated web framework
- **TypeScript**: Full type safety and modern JavaScript features
- **Security**: Helmet for security headers and CORS support
- **Logging**: Morgan for comprehensive HTTP request logging
- **Error Handling**: Centralized error handling with detailed responses
- **Environment Configuration**: Flexible port configuration based on environment
- **Health Monitoring**: Built-in health check endpoint for monitoring

## Endpoints

### Core Endpoints
- `GET /health` - Health check endpoint with system information
  - Returns: status, timestamp, uptime, environment
- `GET /api` - API information and documentation links
  - Returns: welcome message, version, documentation URL

### Error Handling
- `404` - Automatic handling for undefined routes
- Global error handler with development/production modes

## Development

```bash
# Install dependencies
pnpm install

# Start development server (uses DEV_PORT_API from .env)
pnpm dev

# Build for production
pnpm build

# Start production server (uses PROD_PORT_API from .env)
pnpm start

# Run linting
pnpm lint

# Type checking
pnpm check-types

# Clean build directory
pnpm clean
```

## Environment Variables

The API server reads configuration from the root `.env` file:

### Required Variables
- `DEV_PORT_API` - Development server port (e.g., 3001)
- `PROD_PORT_API` - Production server port (e.g., 4001)

### Example .env Configuration
```bash
# Development ports
DEV_PORT_API=3001

# Production ports  
PROD_PORT_API=4001

## API Response Format

All responses follow a consistent JSON format:

### Success Response
```json
{
  "status": "ok",
  "timestamp": "2025-07-15T10:30:00.000Z",
  "data": {...}
}
```

### Error Response
```json
{
  "error": "Error Type",
  "message": "Detailed error message",
  "timestamp": "2025-07-15T10:30:00.000Z"
}
```

## Project Structure

```
src/
├── index.ts          # Main application entry point
├── middleware/       # Custom middleware (future)
├── routes/          # API route handlers (future)
└── utils/           # Utility functions (future)
```

## Deployment

1. Ensure all environment variables are properly configured
2. Build the application: `pnpm build`
3. Start the production server: `pnpm start`
4. Monitor health endpoint: `GET /health`

## Development Notes

- Uses `tsx` for TypeScript development with hot reload
- Cross-platform compatibility with `cross-env`
- Automatic environment detection for port selection
- Development mode includes stack traces in error responses
