# 🚀 Fullstack Turborepo

This monorepo provides a modern fullstack boilerplate using **Next.js** for the frontend and **NestJS** for the backend — organized and managed with **Turborepo**.

It's designed for scalability, type safety, and developer experience — ideal as a base for full-featured applications.

---

## 1. 📦 Getting Started

### Quickstart (One Command)

For new team members, use the one-command setup:

```bash
# Clone and navigate to repo
git clone https://github.com/robertlinde/next-nest-turbo-boilerplate.git
cd next-nest-turbo-boilerplate

# Install dependencies
npm install

# Copy environment files and start everything
cp .env.example .env && \
cp apps/nextjs-frontend/.env.example apps/nextjs-frontend/.env && \
cp apps/nestjs-backend/.env.example apps/nestjs-backend/.env && \
npm run dev:all
```

**Important:** Edit `apps/nestjs-backend/.env` to ensure `DATABASE_URL` credentials match root `.env`.

Then apply migrations:

```bash
cd apps/nestjs-backend && npm run migration:up
```

Your app should now be running:

- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- Maildev UI: http://localhost:1080

### Step-by-Step Setup (Experienced Developers)

1. **Clone and Install**

   ```bash
   git clone https://github.com/robertlinde/next-nest-turbo-boilerplate.git
   cd next-nest-turbo-boilerplate
   npm install
   ```

2. **Setup Environment Files**

   ```bash
   cp .env.example .env
   cp apps/nextjs-frontend/.env.example apps/nextjs-frontend/.env
   cp apps/nestjs-backend/.env.example apps/nestjs-backend/.env
   ```

3. **Start Infrastructure** (Postgres, Redis, Maildev)

   ```bash
   npm run infra:start
   npm run infra:health  # Wait for "healthy" status
   ```

4. **Run Migrations**

   ```bash
   cd apps/nestjs-backend
   npm run migration:up
   cd ../..
   ```

5. **Start Applications**
   ```bash
   npm run dev  # Start Next.js + NestJS
   ```

### Development Philosophy

This project follows the **"infrastructure in containers, apps on host"** pattern:

- **Infrastructure** (Postgres, Redis, Maildev) runs in Docker
- **Applications** (Next.js, NestJS) run locally for fast HMR and debugging

**Benefits:**

- ✅ Unified environment across team (no "works on my machine")
- ✅ Full IDE integration with breakpoints
- ✅ Fast hot reload, no container rebuilds

---

## 2. ⚙️ Base Tech Used

### 🖥 Frontend (`apps/frontend`)

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS** + **PrimeReact**
- **React Hook Form** + **Zod**
- **React Query**
- **next-intl** (i18n)

➡️ More in [apps/nextjs-frontend/README.md](./apps/nextjs-frontend/README.md)

### 🛠 Backend (`apps/backend`)

- **NestJS**
- **TypeScript**
- **MikroORM** + **PostgreSQL**
- **Templated email service**
- **class-validator**

➡️ More in [apps/nestjs-backend/README.md](./apps/nestjs-backend/README.md)

### 📦 Shared (`packages/shared`)

- **TypeScript**
- **class-validator**
- Shared types & DTOs between frontend and backend
- Type-safe API contracts

➡️ More in [packages/shared/README.md](./packages/shared/README.md)

---

## 3. 🤝 Contributing

This repo is intended to be cloned, extended, and customized. Feel free to open issues or submit PRs if you're improving the base or adapting it.

---

## 4. 📝 License

MIT — free to use, modify, and distribute.

➡️ More in [LICENSE](./LICENSE)
