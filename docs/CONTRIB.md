# Contributing

## Development Workflow

1. Install root deps: `npm install`
2. Copy environment files:
   ```bash
   cp .env.example .env
   cp apps/nextjs-frontend/.env.example apps/nextjs-frontend/.env
   cp apps/nestjs-backend/.env.example apps/nestjs-backend/.env
   ```
3. **Important:** Edit `apps/nestjs-backend/.env` to ensure `DATABASE_URL` credentials match root `.env` infrastructure config
4. Start infrastructure (from root): `npm run infra:start`
5. Wait for health check: `npm run infra:health` (Postgres should show `healthy`)
6. Run migrations: `cd apps/nestjs-backend && npm run migration:up`
7. Start apps: `npm run dev` (from root)

### Infrastructure Commands

All infrastructure commands run from repository root:

```bash
npm run infra:start     # Start Postgres, Redis, Maildev
npm run infra:stop      # Stop all services
npm run infra:restart   # Restart (applies config changes)
npm run infra:logs      # View logs
npm run infra:health    # Check service status
```

### Database Operations

Use `docker compose exec` for database operations (works regardless of container naming):

```bash
# Export database
docker compose exec postgres pg_dumpall -U postgres > backup.sql

# Restore database
cat backup.sql | docker compose exec -T postgres psql -U postgres

# Connect to database
docker compose exec postgres psql -U postgres -d nest_boilerplate
```

## Scripts Reference

### Root (`package.json`)

| Script        | Command                                       | Description                                     |
| ------------- | --------------------------------------------- | ----------------------------------------------- |
| infra:start   | `docker compose up -d`                        | Start infrastructure (Postgres, Redis, Maildev) |
| infra:stop    | `docker compose down`                         | Stop infrastructure                             |
| infra:restart | `docker compose down && docker compose up -d` | Restart infrastructure                          |
| infra:logs    | `docker compose logs -f`                      | View infrastructure logs                        |
| infra:ps      | `docker compose ps`                           | Check infrastructure status                     |
| infra:health  | `docker compose ps`                           | Check service health                            |
| dev           | `turbo run dev --parallel`                    | Run all apps in dev mode                        |
| dev:all       | `npm run infra:start && npm run dev`          | Start infra + apps (one command)                |
| build         | `turbo run build`                             | Build all apps and packages                     |
| start:dev     | `turbo run start:dev`                         | Run all apps in dev mode (legacy, use `dev`)    |
| start:prod    | `turbo run start:prod`                        | Run all apps in production mode                 |
| lint          | `turbo run lint --`                           | Run lint across workspace                       |
| lint:fix      | `turbo run lint:fix --`                       | Run lint with autofix                           |
| test:unit     | `turbo run test:unit`                         | Run unit tests                                  |
| test:e2e      | `turbo run test:e2e`                          | Run E2E tests                                   |
| test:unit:cov | `turbo run test:unit:cov`                     | Run unit tests with coverage                    |
| format        | `prettier --write "**/*.{ts,tsx,md}"`         | Format code                                     |
| prepare       | `husky`                                       | Git hooks setup                                 |

### Backend (`apps/nestjs-backend/package.json`)

| Script           | Command                              | Description             |
| ---------------- | ------------------------------------ | ----------------------- |
| build            | `nest build`                         | Compile NestJS          |
| dev              | `nest start --watch`                 | Dev with watch          |
| start:dev        | `nest start --watch`                 | Dev with watch (legacy) |
| start:prod       | `node dist/src/main`                 | Production run          |
| migration:create | `npx mikro-orm migration:create`     | Create migration        |
| migration:up     | `npx mikro-orm migration:up`         | Apply migrations        |
| migration:down   | `npx mikro-orm migration:down`       | Rollback migration      |
| test:unit        | `jest`                               | Unit tests              |
| test:e2e         | `jest --config ./test/jest-e2e.json` | E2E tests               |

### Frontend (`apps/nextjs-frontend/package.json`)

| Script     | Command           | Description         |
| ---------- | ----------------- | ------------------- |
| build      | `next build`      | Build Next.js       |
| dev        | `next dev`        | Dev server          |
| start:dev  | `next dev`        | Dev server (legacy) |
| start:prod | `next start`      | Production server   |
| test:e2e   | `playwright test` | Playwright E2E      |

## Environment Setup

### Infrastructure Environment (Root `.env`)

Infrastructure services are configured in root `.env` (used by `docker-compose.yml`):

| Variable          | Purpose             | Default          |
| ----------------- | ------------------- | ---------------- |
| POSTGRES_PORT     | DB port             | 5432             |
| POSTGRES_DB       | DB name             | nest_boilerplate |
| POSTGRES_USER     | DB user             | postgres         |
| POSTGRES_PASSWORD | DB password         | postgres         |
| POSTGRES_TIMEZONE | DB timezone         | UTC              |
| REDIS_PORT        | Redis port          | 6379             |
| REDIS_PASSWORD    | Redis password      | redis_pass       |
| MAILDEV_SMTP_PORT | Maildev SMTP port   | 1025             |
| MAILDEV_WEB_PORT  | Maildev web UI port | 1080             |

### Application Environment

Copy `.env.example` to `.env` in each app and fill values.

## Environment Variables

### Backend (`apps/nestjs-backend/.env.example`)

**Single-Entry URL Pattern:** This project uses `DATABASE_URL` and `REDIS_URL` to concentrate configuration. This reduces scattered variables and config drift.

**Important:** When changing infrastructure credentials in root `.env`, update the URLs below to match.

| Variable            | Purpose             | Format                               |
| ------------------- | ------------------- | ------------------------------------ |
| NODE_ENV            | Environment         | development \| staging \| production |
| PORT                | API port            | number (default 4000)                |
| ENABLE_SWAGGER      | Swagger UI          | true \| false                        |
| FRONTEND_HOST       | CORS origin         | URL (e.g. http://localhost:3000)     |
| DATABASE_URL        | Database connection | postgresql://user:pass@host:port/db  |
| REDIS_URL           | Redis connection    | redis://:pass@host:port              |
| POSTGRES_DEBUG_MODE | ORM debug           | true \| false                        |
| MAIL_HOST           | SMTP host           | string                               |
| MAIL_PORT           | SMTP port           | number (default 1025 for Maildev)    |

### Frontend (`apps/nextjs-frontend/.env.example`)

| Variable                    | Purpose      | Format                    |
| --------------------------- | ------------ | ------------------------- |
| NEXT_PUBLIC_NODE_ENV        | Environment  | development \| production |
| NEXT_PUBLIC_BACKEND_URL     | API base URL | URL                       |
| NEXT_PUBLIC_MAILDEV_API_URL | Maildev API  | URL (dev only)            |

## Docker Setup

### Daily Development (Recommended)

Infrastructure runs in Docker, apps run locally:

- **Pros:** Fast HMR, full IDE integration, no rebuilds
- **Cons:** None for daily dev

```bash
npm run infra:start    # Start Postgres, Redis, Maildev
npm run dev            # Start apps
```

### Containerized Builds (CI/CD Only)

Application Dockerfiles are preserved in `deploy/` directory for optional containerized deployments:

- `deploy/nextjs-frontend.dockerfile`
- `deploy/nestjs-backend.dockerfile`

These are **not used for daily development** but available for staging/production.

## Testing Procedures

- **Unit:** `npm run test:unit` (root; runs backend jest)
- **Unit coverage:** `npm run test:unit:cov`
- **E2E:** `npm run test:e2e` (root; runs backend jest e2e + frontend playwright)
- Backend E2E uses `jest-e2e.json`; frontend uses Playwright
