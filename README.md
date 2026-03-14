# GDLWebCamp Modern

Migracion de GDLWebCamp a NestJS + React + TypeScript + PostgreSQL.

## Estructura

- `apps/api`: Backend NestJS
- `apps/web`: Frontend React + TS + Ant Design
- `packages/ui-tokens`: Tokens de diseño para paridad visual
- `scripts/migrate-legacy.ts`: Migración de datos desde MySQL legacy

## Arranque local

1. `cp .env.example .env`
2. `npm install`
3. `npm run db:up`
4. `npm run dev:api`
5. `npm run dev:web`

## Endpoints principales

- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /public/home-summary`
- `GET /public/invitados`
- `GET /public/eventos`
- `GET /public/calendario`
- `POST /public/registro`
- `GET /admin/dashboard/metrics`
- `GET /admin/dashboard/registrations-series`
