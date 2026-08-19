# GREEN-SHIFT

## Carbon-Aware Request Router

*Backend Technical Documentation*

Version 1.0 | August 2026

---

## Table of Contents

1. Overview
2. Technology Stack
3. Project Structure
4. Architecture & Request Lifecycle
5. Data Model
6. API Reference
   - 6.1 Public Endpoints
   - 6.2 Admin Endpoints
7. Core Logic
   - 7.1 Routing Algorithm
   - 7.2 Health Monitoring
   - 7.3 Statistics & Carbon Savings
8. Authentication
9. Running & Deployment
10. Known Limitations & Recommendations

---

## 1. Overview

Green-Shift is a backend service built with FastAPI that simulates a carbon-aware load balancer. Instead of routing incoming requests purely by latency or load, it picks the region and server that currently offers the best combination of low carbon intensity, low load, and low latency. The goal is to demonstrate how request routing decisions can reduce the estimated CO₂ footprint of a distributed system while keeping performance acceptable.

The service maintains an in-memory model of a global server fleet spread across 8 geographic zones (27 individual servers in total). Each server has a carbon score, a current load percentage, a latency value, and an online/offline status. On every routed request, Green-Shift selects the best zone and server, forwards a (simulated) call to it, updates its load, and records statistics such as estimated CO₂ saved versus a fixed baseline.

**Key Capabilities**

- Carbon- and load-aware routing across zones and servers.
- A background health-check loop that automatically marks servers online/offline.
- An admin API to manually override server state, simulate traffic, and reset the system.
- Running statistics: total requests, per-zone/per-server counts, average latency, and estimated CO₂ savings.
- Token-based authentication protecting all mutating admin operations.

## 2. Technology Stack

| Component | Technology | Notes |
|---|---|---|
| Language | Python 3.10+ (tested on 3.13) | See requirements.txt |
| Web framework | FastAPI 0.140.0 | Async, auto-generated OpenAPI docs at /docs |
| ASGI server | Uvicorn 0.51.0 | Used with --reload in dev and in the Dockerfile |
| HTTP client | httpx 0.28.1 | Used for forwarding requests and health checks |
| Validation | Pydantic 2.13.4 | Request/response schemas in models/schemas.py |
| Testing | pytest 9.1.1 | Unit tests in tests/ |
| Containerization | Docker | python:3.13-slim base image |

## 3. Project Structure

```
backend/
├── main.py                    # FastAPI app entrypoint, CORS, lifespan hook
├── dockerfile                 # Container build definition
├── requirements.txt           # Python dependencies
├── readme.md                  # Setup instructions
├── conftest.py                # pytest configuration (empty)
├── data/
│   └── carbon_scores.json     # Seed data: zones, servers, carbon/load/latency
├── models/
│   └── schemas.py             # Pydantic request/response models
├── routers/
│   ├── route.py               # Public endpoints (/servers, /route, /stats)
│   └── admin.py                # Admin endpoints (/admin/*)
├── services/
│   ├── auth_service.py        # Credential/token verification
│   ├── carbon_reader.py       # Loads carbon_scores.json
│   ├── state_service.py       # In-memory app state (singleton)
│   ├── routing_service.py     # Zone/server selection algorithm
│   ├── forwarding_service.py  # Outbound HTTP calls to region URLs
│   ├── health_service.py      # Background async health-check loop
│   └── stats_service.py       # Request statistics & CO2 savings
└── tests/
    └── test_routing.py        # Unit tests for routing & forwarding
```

## 4. Architecture & Request Lifecycle

The application follows a simple layered structure: routers handle HTTP concerns, services hold business logic, and models define the data contracts. State is kept in memory (no database) via a module-level singleton in state_service.py, seeded from data/carbon_scores.json on first access.

**Startup**

main.py defines a FastAPI lifespan context manager. On startup it launches health_check_loop() as a background asyncio task, which polls every server every 5 seconds for as long as the app runs; on shutdown the task is cancelled. CORS is configured to allow only http://localhost:5173 (the expected frontend origin during development).

**Typical request flow — GET /route**

- The client calls GET /route.
- routing_service.decide_route() looks at all zones, filters to online servers, and picks the zone with the lowest average (carbon + 0.3 × load) score.
- Within that zone, it picks the single server with the lowest (carbon + 0.6 × load + 0.1 × latency) score.
- state_service marks that server's last_selected timestamp.
- forwarding_service.forward_to_region() attempts an HTTP GET to the chosen server's URL (a simulated downstream call); connection errors, timeouts, and HTTP errors are caught and returned as an {"error": ...} payload rather than raising.
- The server's current_load is increased by 5 (capped at 100); every 50th request across the whole system also decays the load of all non-selected servers by 2, to simulate load balancing over time.
- stats_service.record_request() logs the request and accumulates estimated CO2 saved.
- The endpoint responds with the selected zone/server, the downstream response, the total CO2 saved so far, and a savings multiplier relative to a fixed baseline carbon score of 70.

## 5. Data Model

The authoritative in-memory state is a nested dictionary of the shape zones → servers → server attributes. It is seeded from data/carbon_scores.json and reset to that same seed on /admin/reset. There are 8 zones and a total of 27 servers.

**Zones**

*eu-west, eu-central, af-south, us-east, us-west, ap-south, ap-southeast, ap-northeast*

**Server object**

| Field | Type | Description |
|---|---|---|
| carbon_score | int | Lower is greener. Used directly in both zone and server selection. |
| current_load | int (0–100) | Simulated load percentage; increases with each routed request. |
| latency | int | Simulated latency in ms; factored lightly into server selection. |
| status | "online" \| "offline" | Set automatically by the health checker, or manually via admin API. |
| last_selected | ISO-8601 string \| null | Timestamp of the last time this server was chosen by /route. |
| manual_override | bool | When true, the health checker skips this server (admin-controlled). |

**Pydantic schemas (models/schemas.py)**

| Model | Purpose |
|---|---|
| RouteResponse | Response body for GET /route |
| ServerData | Shape of a single server's state |
| ServerResponse | Response body for GET /servers (nested zones → servers) |
| UpdateCarbonScoreRequest / UpdateLoadRequest / UpdateLatencyRequest / UpdateStatusRequest | Admin PATCH request bodies |
| SimulateRequest | Body for POST /admin/simulate (count 1–300, optional zone) |
| LoginRequest | Body for POST /admin/login (username, password) |

## 6. API Reference

Interactive OpenAPI/Swagger documentation is auto-generated by FastAPI and available at /docs when the server is running. The tables below summarize every route.

### 6.1 Public Endpoints

| Method & Path | Description | Auth |
|---|---|---|
| GET / | Health/liveness check for the API itself. | None |
| GET /servers | Returns the full current state of all zones and servers. | None |
| GET /route | Selects the best zone/server, forwards a simulated call, updates load and stats, and returns the decision. | None |
| GET /stats | Returns aggregate statistics: total requests, per-zone/per-server counts, average latency, CO2 saved, and carbon reduction %. | None |

### 6.2 Admin Endpoints

*All routes below are mounted under the /admin prefix and require a Bearer token (see Section 8).*

| Method & Path | Description |
|---|---|
| PATCH /admin/carbon-score | Manually sets the carbon_score of a given zone/server. |
| PATCH /admin/load | Manually sets the current_load of a given zone/server. |
| PATCH /admin/latency | Manually sets the latency of a given zone/server. |
| PATCH /admin/status | Manually sets a server's status and flags manual_override = true so the health checker leaves it alone. |
| POST /admin/release-override | Clears manual_override so the automatic health checker resumes managing that server's status. |
| POST /admin/simulate | Runs count (1–300) simulated routing decisions, optionally constrained to one zone, updating load and stats as if real traffic occurred. |
| POST /admin/reset | Resets both the server state (back to carbon_scores.json) and the statistics counters. |
| POST /admin/login | Exchanges a username/password for the static admin bearer token. Not itself protected by auth. |

## 7. Core Logic

### 7.1 Routing Algorithm

Implemented in services/routing_service.py. Selection happens in two stages:

**Stage 1 — Choose a zone**

For every zone with at least one online server, compute:

```
zone_score = avg(carbon_score) + 0.3 × avg(current_load)   (across online servers in the zone)
```

The zone with the lowest score is selected. Zones with no online servers are skipped entirely.

**Stage 2 — Choose a server within that zone**

```
server_score = carbon_score + 0.6 × current_load + 0.1 × latency
```

The online server with the lowest score wins. Load is weighted most heavily at the server level (0.6), reflecting that Green-Shift prioritizes spreading traffic away from busy servers once a green zone has already been chosen; latency has the smallest weight (0.1).

**Load feedback loop**

update_load_after_request() increases the winning server's load by 5 points (capped at 100). Separately, a global request counter (increment_and_check_batch) triggers every 50 requests: at that point every server that was not selected has its load decreased by 2 (floored at 0), simulating natural load decay elsewhere in the fleet.

decide_route() also accepts an optional target_zone parameter (used by /admin/simulate) to force routing within a single zone, still choosing the best server inside it.

### 7.2 Health Monitoring

services/health_service.py runs as a long-lived background task (started in main.py's lifespan hook). Every 5 seconds (POLL_INTERVAL_SECONDS) it concurrently pings every server's URL with a 2-second timeout.

- Servers with manual_override = true are skipped; their status is fully admin-controlled.
- A per-server streak counter tracks consecutive successes (positive) or failures (negative).
- A server is marked "online" only after 2 consecutive successful checks (SUCCESS_THRESHOLD).
- A server is marked "offline" only after 2 consecutive failed checks (FAILURE_THRESHOLD).
- This hysteresis avoids flapping status on a single transient failure or recovery.

### 7.3 Statistics & Carbon Savings

services/stats_service.py keeps a single module-level stats dictionary. On every routed request (record_request), it increments total_requests, per-zone and per-server counters, accumulates latency, and adds max(0, BASELINE_CARBON_SCORE − carbon_score) to co2_saved, where BASELINE_CARBON_SCORE is a fixed constant of 70. get_stats() derives two additional metrics on read: average_latency_ms and carbon_reduction_percent (CO2 saved as a percentage of what the baseline would have produced). The "savings_multiplier" returned by /route is a separate, request-level figure computed as BASELINE_CARBON_SCORE ÷ the selected server's carbon score.

## 8. Authentication

services/auth_service.py implements a minimal bearer-token scheme. POST /admin/login accepts a username/password pair and, if correct, returns a static admin token. All other /admin/* routes require an Authorization: Bearer \<token\> header, checked via FastAPI's HTTPBearer security dependency (require_auth).

| Item | Value |
|---|---|
| Login endpoint | POST /admin/login |
| Expected body | `{ "username": "<admin_username>", "password": "<admin_password>" }` |
| Token returned | `<admin_token>` |
| Usage | `Authorization: Bearer <admin_token>` |

> **Security note**
> The admin username, password, and bearer token are hard-coded as constants in auth_service.py. There is no hashing, expiry, or per-user distinction; a single shared static token grants full admin access. This is acceptable for a prototype/demo but must not be used as-is in a production deployment. See Section 10 for recommendations.

## 9. Running & Deployment

**Local development**

```bash
python -m venv venv
source venv/bin/activate     # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

# App:     http://127.0.0.1:8000
# Swagger: http://127.0.0.1:8000/docs
```

**Docker**

The provided dockerfile uses python:3.13-slim, installs requirements.txt, copies the project, and runs uvicorn on 0.0.0.0:8000 with --reload enabled even in the container image.

```bash
docker build -t green-shift-backend .
docker run -p 8000:8000 green-shift-backend
```

**CORS**

Only http://localhost:5173 (the default Vite dev server origin) is allowed by CORSMiddleware. Any other frontend origin, including a production domain, will need this list updated in main.py.

**Region URLs**

forwarding_service.py hard-codes 27 region URLs of the form http://\<region\>:8000, intended to resolve via container-network DNS names (e.g. Docker Compose service names) rather than public hostnames. In an environment without those services running, /route and /admin/simulate will still succeed; connection failures are caught and surfaced as an {"error": ...} field rather than an HTTP failure.

## 10. Known Limitations & Recommendations

| Area | Limitation | Suggested improvement |
|---|---|---|
| Persistence | All state (server fleet, stats) lives in process memory and resets on restart. | Move to Redis/Postgres for durability across restarts and multiple worker processes. |
| Auth | Hard-coded credentials and a single static, non-expiring token in source code. | Use environment-variable secrets, hashed passwords, and short-lived JWTs. |
| Concurrency | Global stats dict and _state are mutated without locks; fine for a single async worker but unsafe with multiple Uvicorn workers. | Use a shared store (e.g. Redis) if scaling beyond one worker process. |
| CORS | Only one hard-coded localhost origin is allowed. | Drive allowed origins from configuration/environment per deployment. |
| Dockerfile | Runs with --reload in the container image, which is a development flag. | Use a production ASGI setup (e.g. multiple Uvicorn/Gunicorn workers, no --reload) for deployed environments. |
