# GDLWebCamp Modern

Reinterpretacion moderna de `GDLWebCamp` con un stack full stack actual:

- `Frontend`: React + TypeScript + Vite
- `Backend`: NestJS + TypeScript
- `Base de datos`: PostgreSQL
- `Objetivo`: conservar la identidad visual del proyecto original, pero con una arquitectura mas mantenible, layouts modernos y una base lista para crecer

## Estado del proyecto

El repositorio incluye dos modos de uso:

1. `Modo full stack local`
- Frontend React conectado a la API NestJS y PostgreSQL
- Registro funcional sin pasarela de pago
- Panel admin disponible en local

2. `Modo demo estatico para GitHub Pages`
- Frontend publico desplegable con GitHub Actions
- Usa datos demo embebidos en el frontend
- El panel admin y la API real no se alojan en GitHub Pages

## Estructura

- `apps/api`: API en NestJS
- `apps/web`: frontend publico y admin en React + Vite
- `packages/ui-tokens`: tokens de diseno compartidos
- `scripts/migrate-legacy.ts`: base para migracion de datos legacy
- `.github/workflows/deploy-pages.yml`: workflow para publicar el demo del frontend en GitHub Pages

## Funcionalidad actual

### Sitio publico

- Home
- Conferencia
- Calendario
- Invitados
- Registro

### Panel admin

- Login
- Dashboard
- CRUD generico de entidades

### Datos demo incluidos

El frontend trae datos demo para GitHub Pages:

- invitados
- eventos
- resumen de home
- envio simulado de registro

Eso permite compartir un demo navegable aunque el backend no este desplegado.

## Arranque local

### Requisitos

- Node.js 20+
- npm 10+
- Docker y Docker Compose

### Instalacion

```bash
cp .env.example .env
npm install
```

### Base de datos

```bash
npm run db:up
npm run db:init
```

Esto:

- levanta PostgreSQL con Docker
- crea esquema
- inserta seed con invitados, eventos, regalos, admin y registros demo

### Desarrollo

Terminal 1:

```bash
npm run dev:api
```

Terminal 2:

```bash
npm run dev:web
```

Frontend local:

```text
http://localhost:5173
```

API local:

```text
http://localhost:4000
```

## Variables de entorno

Archivo base: [.env.example](/home/otilio/projects/gdlwebcamp-modern/.env.example)

### API

- `PORT`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `JWT_EXPIRES_IN`
- `JWT_REFRESH_EXPIRES_IN`
- `DATABASE_URL`

### Web

- `VITE_API_URL`: URL de la API real
- `VITE_DEMO_MODE`: activa modo demo estatico
- `VITE_ROUTER_MODE`: `browser` o `hash`
- `VITE_BASE_PATH`: base path para deploys tipo GitHub Pages

## Seed y credenciales

El seed vive en:

- [schema.sql](/home/otilio/projects/gdlwebcamp-modern/apps/api/src/db/sql/schema.sql)
- [seed.sql](/home/otilio/projects/gdlwebcamp-modern/apps/api/src/db/sql/seed.sql)

Credenciales admin seed:

```text
admin / admin123
```

## Scripts utiles

```bash
npm run dev
npm run dev:api
npm run dev:web
npm run build
npm run lint
npm run test
npm run db:up
npm run db:down
npm run db:init
npm run migrate:legacy
```

## Deploy del demo en GitHub Pages

El repo ya incluye workflow para desplegar el frontend publico en GitHub Pages:

- Workflow: [deploy-pages.yml](/home/otilio/projects/gdlwebcamp-modern/.github/workflows/deploy-pages.yml)
- Build target: `apps/web/dist`
- Modo usado en Pages:
  - `VITE_DEMO_MODE=true`
  - `VITE_ROUTER_MODE=hash`
  - `VITE_BASE_PATH=/<nombre-del-repo>/`

### Que hace ese deploy

- construye el frontend con Vite
- activa modo demo con datos locales
- publica el resultado en GitHub Pages

### Que no hace

- no despliega NestJS
- no despliega PostgreSQL
- no habilita el CRUD/admin real

## Como activar GitHub Pages

1. Sube este repo a GitHub
2. Asegurate de usar la rama `main`
3. Ve a `Settings > Pages`
4. En `Build and deployment`, selecciona `GitHub Actions`
5. Haz push a `main` o ejecuta manualmente el workflow

La URL final normalmente quedara asi:

```text
https://TU_USUARIO.github.io/TU_REPO/
```

## Limitaciones del demo en Pages

Como GitHub Pages es hosting estatico:

- el sitio publico funciona en modo demo
- el panel admin muestra mensaje informativo
- el registro es simulado
- la API real solo funciona en local o si la despliegas aparte

## Siguiente deploy recomendado para full stack

Si quieres una demo completa con backend real:

- `Frontend`: Vercel o GitHub Pages
- `Backend`: Render, Railway o Fly.io
- `DB`: Neon, Railway Postgres o Supabase

## Notas de diseno

El proyecto busca un equilibrio entre:

- fidelidad al sitio original
- uso de `Grid` y `Flexbox`
- mejor jerarquia visual
- frontend mas mantenible

## Licencia

Uso educativo y de demostracion, salvo que definas otra licencia para el repositorio.
