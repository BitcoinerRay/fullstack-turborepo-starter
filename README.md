# Fullstack Turborepo

Monorepo: **Next.js** frontend and **NestJS** backend, managed with **Turborepo**. Built for scalability, type safety, and developer experience.

---

## Getting Started

**Requirements:** Node 24.x, npm 11.x (see `package.json` engines).

### One-command setup

```bash
git clone https://github.com/robertlinde/next-nest-turbo-boilerplate.git
cd next-nest-turbo-boilerplate
npm install

cp .env.example .env
cp apps/nextjs-frontend/.env.example apps/nextjs-frontend/.env
cp apps/nestjs-backend/.env.example apps/nestjs-backend/.env

npm run infra:start
npm run infra:health   # wait until healthy

cd packages/db && npm run db:generate && npm run migrate:deploy && cd ../..
npm run dev
```

Edit `apps/nestjs-backend/.env` so `DATABASE_URL` matches the Postgres settings in the root `.env`.

**URLs:** Frontend http://localhost:3000 · Backend http://localhost:4000 · Maildev http://localhost:1080

### Step-by-step

1. Clone, then `npm install`.
2. Copy `.env.example` → `.env` in repo root, `apps/nextjs-frontend`, and `apps/nestjs-backend`.
3. `npm run infra:start` then `npm run infra:health` (Docker: Postgres, Redis, Maildev).
4. `cd packages/db && npm run db:generate && npm run migrate:deploy && cd ../..`
5. `npm run dev` (Next.js + NestJS in parallel).

Infrastructure runs in Docker; apps run on the host for HMR and debugging.

---

## Tech Stack

| Layer    | Path                   | Stack                                                                                                |
| -------- | ---------------------- | ---------------------------------------------------------------------------------------------------- |
| Frontend | `apps/nextjs-frontend` | Next.js (App Router), TypeScript, Tailwind, PrimeReact, React Hook Form, Zod, React Query, next-intl |
| Backend  | `apps/nestjs-backend`  | NestJS, TypeScript, Prisma, PostgreSQL, templated email, class-validator                             |
| Shared   | `packages/shared`      | Shared types & DTOs, type-safe API contracts                                                         |
| DB       | `packages/db`          | Prisma schema, migrations, generated client                                                          |

Details: [apps/nextjs-frontend/README.md](./apps/nextjs-frontend/README.md), [apps/nestjs-backend/README.md](./apps/nestjs-backend/README.md), [packages/shared/README.md](./packages/shared/README.md), [packages/db/README.md](./packages/db/README.md).

---

## Scripts

| Command                                                | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ |
| `npm run dev`                                          | Run Next.js + NestJS in dev                            |
| `npm run dev:all`                                      | Start infra (Docker) then dev                          |
| `npm run build`                                        | Build all apps and packages (includes Prisma generate) |
| `npm run infra:start` / `infra:stop` / `infra:restart` | Docker Compose for Postgres, Redis, Maildev            |
| `npm run lint` / `lint:fix`                            | Lint across the monorepo                               |
| `npm run format`                                       | Prettier on TS/TSX/MD                                  |

---

## Contributing

Clone, extend, and customize. Issues and PRs welcome.

**License:** MIT — [LICENSE](./LICENSE)
