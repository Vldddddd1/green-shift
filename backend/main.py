from fastapi import FastAPI
from routers import route
from routers import admin
from fastapi.middleware.cors import CORSMiddleware

import asyncio
from contextlib import asynccontextmanager
from services.health_service import health_check_loop

@asynccontextmanager
async def lifespan(app: FastAPI):
    task = asyncio.create_task(health_check_loop())
    yield
    task.cancel()

app = FastAPI(lifespan = lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(route.router)
app.include_router(admin.router)

@app.get("/")
def read_root():
    return {"status": "Green-Shift backend is alive"}