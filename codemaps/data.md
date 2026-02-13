# Data Models & Schemas

**Updated:** 2025-02-13

## Backend Entities (MikroORM)

### BaseEntity

- `common/entities/base.entity.ts`
- Fields: `id` (uuid), `createdAt`, `updatedAt`
- Abstract base for all entities

### Dummy

- `common/entities/dummy.entity.ts`
- Extends BaseEntity
- Placeholder (remove when adding real entities)

## Config Schemas

### ConfigKey (Backend)

- `config/config-key.enum.ts`
- Keys: NODE*ENV, FRONTEND_HOST, PORT, ENABLE_SWAGGER, POSTGRES*_, REDIS\__, MAIL\_\*, MAILDEV_WEB_PORT

### Validation (Backend)

- `config/validation.schema.ts`
- Joi schema for env vars

## Frontend Types

- `FloatLabelInputTextProps` → `components/float-label-input-text/types/`
- `ErrorResponse` (backend) → `common/filters/mikro-orm-exception/types/`

## Shared Package

- `packages/shared/src/index.ts` — empty, reserved for shared DTOs/types
