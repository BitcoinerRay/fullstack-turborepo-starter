# Data Models & Schemas

**Updated:** 2025-02-13

## Database Models (Prisma)

### Schema Location

- `packages/db/prisma/schema.prisma`
- All models defined in Prisma schema format

### Dummy Model

- Base fields: `id` (UUID), `createdAt`, `updatedAt`
- Placeholder model (remove when adding real models)
- All models should include these base fields for consistency

## Config Schemas

### ConfigKey (Backend)

- `config/config-key.enum.ts`
- Keys: NODE*ENV, FRONTEND_HOST, PORT, ENABLE_SWAGGER, POSTGRES*\_, REDIS\_\_, MAIL\_\*, MAILDEV_WEB_PORT

### Validation (Backend)

- `config/validation.schema.ts`
- Joi schema for env vars

## Frontend Types

- `FloatLabelInputTextProps` → `components/float-label-input-text/types/`
- `ErrorResponse` (backend) → `common/filters/prisma-exception/types/`

## Shared Packages

### `packages/shared`

- `packages/shared/src/index.ts` — empty, reserved for shared DTOs/types

### `packages/db`

- Prisma ORM setup and configuration
- Centralized database schema and migrations
- Exports: `PrismaClient`, `PrismaService`, `PrismaModule`
