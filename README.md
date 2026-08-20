# OmniChannel Customer Engagement Service

This repository is a **structure-only starter** for the Customer Engagement microservice.

## Port

`3003`

## Architecture

```text
Postman
   |
API Gateway :8080
   |  JWT verified by Gateway
   v
Customer Engagement Service :3003
```

The service does **not** duplicate IAM/JWT authentication logic.

## Folder convention

```text
src/
  APIs/
    _template/
      controllers/
      routes/
      services/
    <TMFAlignedMethodName>/
      controllers/
      routes/
      services/
  config/
  middleware/
  models/
  routes/
  utils/
  app.js
server.js
```

## Adding an API

1. Copy `src/APIs/_template`.
2. Rename the copied folder to the exact **TMF-aligned method name** from the mapping sheet.
3. Rename/update the controller, service, and route files.
4. Use request parameters and responses from the approved API Params / MIS contract.
5. If a documented response exists, preserve it exactly.
6. Do not invent business responses unless the contract is unavailable and the team has explicitly approved a generated fallback.

## Run

```bash
npm install
node server.js
```

Health:

```http
GET http://localhost:3003/health
```

## Environment

Copy `.env.example` to `.env` and set the local values.

The Gateway should use:

```env
ENGAGEMENT_SERVICE_URL=http://localhost:3003
```

`SERVICE_BASE_PATH` must be updated to the final route prefix agreed in the API mapping/Gateway configuration.
