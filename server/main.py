import os
from fastapi import FastAPI

app = FastAPI()

SERVER_NAME = os.getenv("SERVER_NAME", "unknown")
ZONE = os.getenv("ZONE", "unknown")


@app.get("/")
def status():
    return {
        "server": SERVER_NAME,
        "zone": ZONE,
        "status": "ok"
    }