# Discovery Service

BMC Discovery Service for FinOps platform - Asset discovery and data synchronization service.

## Features

- 🔍 **3-Phase Discovery Process**
  1. Fetch node types and categories from BMC Discovery
  2. Get all node IDs for each node type
  3. Fetch detailed data for each node and store in PostgreSQL

- 🗄️ **Dynamic Database Schema**
  - Creates separate tables for each node type (host, virtualmachine, etc.)
  - Category-specific columns for different asset types
  - UPSERT operations for data synchronization

- 🚀 **BMC Discovery Integration**
  - Full REST API client with authentication
  - Automatic retry with exponential backoff
  - Connection health monitoring

## Quick Start

### 1. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
vi .env
```

### 2. Required Environment Variables

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=finops_discovery
DB_USER=finops_user
DB_PASSWORD=your_password

# BMC Discovery
DISCOVERY_URL=https://192.168.60.168
DISCOVERY_API_TOKEN=your_bmc_token
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Development

```bash
# Start development server
npm run dev

# Start with auto-reload
npm run dev:watch
```

### 5. Production Build

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## API Endpoints

### Health Check

``` bash
GET /health
```

### Discovery Statistics

``` bash
GET /api/discovery/stats
```

### Create Node Type Tables

``` bash
POST /api/discovery/create-tables
```

### Synchronize All Node Data

``` bash
POST /api/discovery/sync-all
```

## Data Flow

1. **Node Type Discovery**

   ``` bash
   GET /taxonomy/nodekinds?format=info
   → Creates tables for each node type
   ```

2. **Node ID Collection**

   ``` bash
   GET /data/kinds/{nodeName}
   → Collects all node IDs per type
   ```

3. **Detail Synchronization**

   ``` bash
   GET /data/nodes/{nodeId}
   → Fetches full node details
   → Stores in type-specific tables
   ```

## Database Schema

Each node type gets its own table with:

- **Standard Columns**: id, node_id, name, display_name, kind, category
- **Category-Specific Columns**: Based on asset type (hosts, network, storage, etc.)

Example tables:

- `host` - Physical servers
- `virtualmachine` - Virtual machines  
- `networkdevice` - Network equipment
- `storagesystem` - Storage arrays
- `database` - Database instances

## Logging

Uses Winston for structured logging:

- Console output for development
- File output for production
- Request/response logging for BMC API calls

## Error Handling

- Graceful BMC API error handling
- Database transaction rollback
- Detailed error logging
- Health check endpoints
