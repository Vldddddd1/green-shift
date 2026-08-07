from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import route

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(route.router)


@app.get("/")
def read_root():
    return {"status": "Green-Shift backend is alive"}