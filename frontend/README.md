# Green-Shift - Frontend

React and TypeScript single-page app for Green-Shift, an Eco-Routing Cloud Balancer demo. It visualizes simulated web traffic being routed to whichever server region currently has the lowest carbon intensity, on a live interactive map, with an authenticated admin panel for monitoring and driving the simulation.

For the full architecture write-up (data flow, state management, theming, component breakdown, diagrams) see [`green-shift_frontend-documentation.md`](./green-shift_frontend-documentation.md) in this same folder.

## Tech Stack

React 19, TypeScript, Vite 8, MUI v9, react-router v8, react-leaflet/Leaflet, Vitest with Testing Library, Docker.

## Prerequisites

- Node.js 20+ and npm
- Docker and Docker Compose (optional), if you want to run the full stack (frontend, backend, and simulated region servers) instead of just the frontend

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

The dev server starts at **http://localhost:5173**.

By default the app proxies `/api/*` to `http://127.0.0.1:8000`, so for live data (the map, live stats, admin login) the backend needs to be running separately on port 8000, or you can point the proxy elsewhere with the `API_PROXY_TARGET` environment variable. Without a backend running, the UI still loads; it will just show "Offline"/"N/A" everywhere data would normally appear.

To run the whole stack (frontend, backend, and the simulated region servers) together, use Docker Compose from the repo root instead. See **Running with Docker** below.

## Available Scripts

Run from inside `frontend/`:

| Script | Command | What it does |
|---|---|---|
| `npm run dev` | `vite` | Starts the hot-reload dev server on `:5173` |
| `npm run build` | `tsc -b && vite build` | Type-checks, then produces a production build in `dist/` |
| `npm run preview` | `vite preview` | Serves the production build locally on `:4173` |
| `npm run lint` | `eslint .` | Lints the codebase |
| `npm run test` | `vitest run` | Runs the test suite once |
| `npm run test:watch` | `vitest` | Runs the test suite in watch mode |

## Environment Variables

| Variable | Used by | Purpose |
|---|---|---|
| `API_PROXY_TARGET` | `vite.config.ts` (dev + preview proxy) | Backend base URL that `/api/*` requests are proxied to. Defaults to `http://127.0.0.1:8000`. |

No other environment variables are required to run the frontend on its own. The repo-root `.env` holds an `NGROK_AUTHTOKEN` used only by the `ngrok` service in `docker-compose.yml`, for tunneling the whole stack publicly. It is not something the frontend itself reads.

## Project Structure

```
frontend/src/
├── assets/       # colors, theme tokens, formatting helpers, Leaflet setup + region data
├── components/   # shared UI + Dashboard/, AdminPanel/, Landing/ feature components
├── hooks/        # cross-cutting state: auth session, live metrics polling, theme
├── services/     # API calls (admin auth + admin write endpoints)
└── pages/        # landing, dashboard, admin (+ dev-only sandbox), each with an index.ts barrel
```

See the full documentation for the complete layered-architecture breakdown of each folder.

## Routes

| Path | Access |
|---|---|
| `/` | Public, landing page |
| `/dashboard` | Public, live map and routing overview |
| `/admin/login` | Public, admin sign-in |
| `/admin`, `/admin/regions`, `/admin/simulation`, `/admin/settings` | Requires an active admin session (30-minute session, checked every 15s) |
| `/dev` | Dev-server only, empty sandbox page |

## Testing

Tests run on Vitest, React Testing Library, and jsdom. Test files live outside this folder, at the repo-root `tests/frontend/` (kept alongside `tests/backend/`), and are picked up via the paths configured in `vite.config.ts`'s `test` block. Running `npm run test` from `frontend/` still finds and runs them correctly.

## Running with Docker

From the repo root (not `frontend/`):

```bash
docker compose up frontend-dev backend   # hot-reload dev mode, :5173
# or
docker compose up frontend backend       # production build served via vite preview, :4173
```

The `frontend`/`frontend-dev` services already set `API_PROXY_TARGET=http://backend:8000` for you. `docker-compose.yml` also spins up roughly 27 simulated per-region "server" containers that the backend routes traffic between, plus an optional `ngrok` service for exposing the production frontend publicly.

## Conventions for Contributors

- Styling is always via MUI's `sx` prop, using the `theme.fluid` (responsive `clamp()` sizing) and `theme.custom` (mode-aware design values) tokens defined in `assets/themes/theme.ts`. Avoid introducing CSS Modules or styled-components.
- Shared cross-cutting state follows the "plain hook holds state, thin Provider wraps it in Context" pattern (see `hooks/useAuthSession.ts` + `hooks/AuthProvider.tsx`, or `hooks/liveMetrics.ts` + `hooks/LiveMetricsProvider.tsx`). Reuse this pattern for new shared state rather than adding a state library.
- Every page folder under `src/pages/` follows the `PageName.tsx` + `index.ts` re-export barrel pattern.

For anything deeper, such as data flow diagrams, API endpoints consumed, theming internals, or known gaps, see [`green-shift_frontend-documentation.md`](./green-shift_frontend-documentation.md).
