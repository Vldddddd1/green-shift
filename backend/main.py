from fastapi import FastAPI
from routers import route

app = FastAPI()

app.include_router(route.router)


@app.get("/")
def read_root():
    return {"status": "Green-Shift backend is alive"}