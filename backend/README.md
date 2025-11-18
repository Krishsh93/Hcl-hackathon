# Backend (Express)

A clean Express backend with a simple, extensible structure.

## Quick start

1. Copy `.env.example` to `.env` and adjust if needed.
2. Install dependencies and run the dev server:

```
# from backend/
npm install
npm run dev
```

The server listens on `http://localhost:5000` by default.

- Health check: `GET /api/health`
- Ping: `GET /api/v1/ping`

## Structure

```
src/
  config/        # Env/config management
  controllers/   # Route handlers
  load/          # App/bootstrap loaders
  middlewares/   # Error and custom middlewares
  routes/        # Routers (versioned + utilities)
  server.js      # HTTP server entry
```

## Production

```
npm run start
```

Use environment variables via `.env` or your process manager.