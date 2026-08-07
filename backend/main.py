from fastapi import FastAPI
from routers import route
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(route.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"status": "Green-Shift backend is alive"}