# Architecture

**Updated:** 2025-02-13

## Overview

Turborepo monorepo with Next.js frontend and NestJS backend.

```
apps/
  nestjs-backend/   # API (Express)
  nextjs-frontend/ # Next.js 16 App Router
packages/
  shared/           # Shared types/utils (empty)
```

## Dependency Graph

- **Root:** `turbo`, `husky`, `prettier`, `commitlint`
- **Backend →** `@nestjs/*`, `@mikro-orm/*`, `ioredis`, `joi`, `helmet`, `cookie-parser`
- **Frontend →** `next`, `next-intl`, `primereact`, `@tanstack/react-query`, `zustand`, `zod`
- **Both →** `@next-nest-turbo-auth-boilerplate/shared` (internal)

## Build Pipeline

- `turbo.json`: build depends on `^build`
- Outputs: `dist/**` (backend), `.next/**` (frontend)
- Tasks: `build`, `start:dev`, `start:prod`, `lint`, `test:unit`, `test:e2e`, `docker:build`

## Cross-App

- API prefix: `/api`
- CORS: `FRONTEND_HOST`
- Swagger: `/api/docs` (when `ENABLE_SWAGGER=true`)
