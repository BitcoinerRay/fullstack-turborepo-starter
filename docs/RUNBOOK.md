# Runbook

## Development Setup

### Philosophy: Infrastructure in Containers, Apps on Host

This repository follows the "infra-in-containers, apps-on-host" pattern:

- **Infrastructure** (Postgres, Redis, Maildev) runs in Docker containers
- **Applications** (Next.js, NestJS) run locally via turbo for fast HMR and debugging

This approach provides:

- Unified infrastructure across team members (no "works on my machine")
- Full IDE integration with breakpoints and hot reload
- No app container rebuilds during development

### Starting Infrastructure

Start all infrastructure services (from repository root):

```bash
npm run infra:start    # Start Postgres, Redis, Maildev
npm run infra:health   # Check service health status
```

Wait for Postgres to show `healthy` status before starting apps (first run takes ~5-10s).

### Starting Applications

**Option 1: Experienced developers**

```bash
npm run dev            # Start Next.js + NestJS (expects infra already running)
```

**Option 2: New team members (one command)**

```bash
npm run dev:all        # Start infra + apps
```

**Individual apps:**

```bash
cd apps/nextjs-frontend && npm run dev    # Frontend only (port 3000)
cd apps/nestjs-backend && npm run dev     # Backend only (port 4000)
```

### Managing Infrastructure

```bash
npm run infra:stop     # Stop all infrastructure services
npm run infra:restart  # Restart (applies config/env changes)
npm run infra:logs     # View logs (follow mode)
npm run infra:ps       # Check service status
```

## Deployment Procedures

### Build

```bash
npm ci
npm run build
```

### Production Run

```bash
npm run start:prod
```

- Backend: `node dist/src/main` (default port 4000)
- Frontend: `next start` (default port 3000)

### Containerized Deployment (CI/CD)

Application Dockerfiles are preserved in `deploy/` directory for CI/CD use:

- `deploy/nextjs-frontend.dockerfile`
- `deploy/nestjs-backend.dockerfile`

These are **not used for daily development** but available for staging/production deployments.

## CI/CD

- **Build workflow:** Runs on PR; `npm ci` + `npm run build`
- **Release workflow:** Runs on push to `main`; creates git tag via `get-next-version`
- **Node:** 24.13.1
- **Docker builds:** Use Dockerfiles in `deploy/` directory if needed for containerized deployments

## Monitoring and Alerts

- Backend health: `GET /api/health` (returns 200 when DB is reachable)
- Swagger: `GET /api/docs` when `ENABLE_SWAGGER=true`

## Common Issues and Fixes

| Issue                                | Fix                                                                                                                                       |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| App can't connect to DB on first run | Wait 5-10s for Postgres healthcheck; verify with `npm run infra:health` (should show `healthy`)                                           |
| Migration fails                      | Ensure infrastructure is running (`npm run infra:start`) and `DATABASE_URL` in `apps/nestjs-backend/.env` matches root `.env` credentials |
| CORS errors                          | Set `FRONTEND_HOST` to the frontend origin in `apps/nestjs-backend/.env`                                                                  |
| Redis connection failed              | Check infrastructure status: `npm run infra:health`; restart if needed: `npm run infra:restart`                                           |
| Shared package not found             | Run `cd packages/shared && npm run build`                                                                                                 |
| Port in use                          | Change `PORT` (backend) or use different port for `next dev`                                                                              |

## Database Operations

Export data:

```bash
docker compose exec postgres pg_dumpall -U postgres > backup.sql
```

Restore data:

```bash
cat backup.sql | docker compose exec -T postgres psql -U postgres
```

## Rollback Procedures

1. **Application:** Redeploy previous Docker image or previous git tag
2. **Database migrations:** `cd apps/nestjs-backend && npm run migration:down`
3. **Infrastructure:** `npm run infra:stop`
