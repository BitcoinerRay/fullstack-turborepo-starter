# Architecture

**Updated:** 2025-02-13

## Overview

Turborepo monorepo with Next.js frontend and NestJS backend.

```
apps/
  nestjs-backend/   # API (Express)
  nextjs-frontend/  # Next.js 16 App Router
packages/
  db/               # Prisma ORM + PostgreSQL
  shared/           # Shared types/utils
```

## Dependency Graph

- **Root:** `turbo`, `husky`, `prettier`, `commitlint`
- **Backend →** `@nestjs/*`, `@next-nest-turbo-auth-boilerplate/db`, `ioredis`, `joi`, `helmet`, `cookie-parser`
- **Database →** `@prisma/client`, `prisma`
- **Frontend →** `next`, `next-intl`, `primereact`, `@tanstack/react-query`, `zustand`, `zod`
- **Shared →** `@next-nest-turbo-auth-boilerplate/shared` (internal, used by both apps)

## Build Pipeline

- `turbo.json`: build depends on `^build` and `^db:generate`
- Outputs: `dist/**` (backend/packages), `.next/**` (frontend), `node_modules/.prisma/client` (db)
- Tasks: `build`, `db:generate`, `dev`, `start:dev`, `start:prod`, `lint`, `lint:fix`, `format`, `test:unit`, `test:unit:cov`, `test:e2e`

## Cross-App

- API prefix: `/api`
- CORS: `FRONTEND_HOST`
- Swagger: `/api/docs` (when `ENABLE_SWAGGER=true`)
