# Backend (NestJS)

**Updated:** 2025-02-13

## Entry

- `main.ts` → `AppModule`, global ValidationPipe, MikroOrmExceptionFilter, Swagger

## Modules

| Module       | Path                      | Exports      |
| ------------ | ------------------------- | ------------ |
| AppModule    | `app.module.ts`           | AppModule    |
| CommonModule | `common/common.module.ts` | CommonModule |
| EmailModule  | `email/email.module.ts`   | EmailModule  |
| HealthModule | `health/health.module.ts` | HealthModule |
| RedisModule  | `redis/redis.module.ts`   | RedisModule  |

## Structure

```
src/
  app.module.ts
  main.ts
  config/           # app.config, validation.schema, ConfigKey
  common/
    decorators/     # ValidateHeader
    entities/       # BaseEntity, Dummy
    filters/        # MikroOrmExceptionFilter
    logger/         # LoggerMiddleware, LoggerModule, LoggerService
  email/            # EmailModule, EmailService, AcceptedLanguages
  health/           # HealthController, HealthModule
  redis/            # RedisModule, RedisService
  utils/            # time.util (oneSecond, oneMinute, etc.)
```

## External Deps

- `@nestjs/*` (common, core, config, schedule, swagger, terminus, throttler)
- `@mikro-orm/*` (core, nestjs, postgresql, migrations)
- `@nestjs-modules/mailer`, `ioredis`, `joi`, `helmet`, `cookie-parser`, `uuid`

## Data

- ORM: MikroORM + PostgreSQL
- Migrations: `@mikro-orm/migrations`
- Config: `mikro-orm.config.ts` (root of nestjs-backend)
