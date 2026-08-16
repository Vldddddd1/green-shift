from fastapi import APIRouter, Depends, HTTPException
from services.state_service import get_state, reset_state
from services.routing_service import decide_route, update_load_after_request
from services.forwarding_service import forward_to_region
from services.stats_service import reset_stats, record_request
from services.auth_service import verify_credentials, ADMIN_TOKEN, require_auth
from models.schemas import (
    UpdateCarbonScoreRequest,
    UpdateLoadRequest,
    UpdateStatusRequest,
    UpdateLatencyRequest,
    SimulateRequest,
    LoginRequest,
)

router = APIRouter(prefix="/admin")


@router.patch("/carbon-score", dependencies=[Depends(require_auth)])
def update_carbon_score(payload: UpdateCarbonScoreRequest):
    zones = get_state()
    if payload.zone not in zones or payload.server not in zones[payload.zone]:
        raise HTTPException(status_code=404, detail="Zone or server not found")

    zones[payload.zone][payload.server]["carbon_score"] = payload.carbon_score
    return {"status": "updated"}


@router.patch("/load", dependencies=[Depends(require_auth)])
def update_load(payload: UpdateLoadRequest):
    zones = get_state()
    if payload.zone not in zones or payload.server not in zones[payload.zone]:
        raise HTTPException(status_code=404, detail="Zone or server not found")

    zones[payload.zone][payload.server]["current_load"] = payload.current_load
    return {"status": "updated"}


@router.patch("/latency", dependencies=[Depends(require_auth)])
def update_latency(payload: UpdateLatencyRequest):
    zones = get_state()
    if payload.zone not in zones or payload.server not in zones[payload.zone]:
        raise HTTPException(status_code=404, detail="Zone or server not found")
    zones[payload.zone][payload.server]["latency"] = payload.latency
    return {"status": "updated"}


@router.patch("/status", dependencies=[Depends(require_auth)])
def update_status(payload: UpdateStatusRequest):
    zones = get_state()
    if payload.zone not in zones or payload.server not in zones[payload.zone]:
        raise HTTPException(status_code=404, detail="Zone or server not found")

    zones[payload.zone][payload.server]["status"] = payload.status
    return {"status": "updated"}


@router.post("/simulate", dependencies=[Depends(require_auth)])
def simulate_requests(payload: SimulateRequest):
    results = []
    for _ in range(payload.count):
        zone, server = decide_route()
        forward_to_region(server)
        update_load_after_request(zone, server)

        carbon_score = get_state()[zone][server]["carbon_score"]
        record_request(zone, server, carbon_score)

        results.append({"zone": zone, "server": server})

    return {"simulated": payload.count, "results": results}


@router.post("/reset", dependencies=[Depends(require_auth)])
def reset_everything():
    reset_state()
    reset_stats()
    return {"status": "reset"}


@router.post("/login")
def login(payload: LoginRequest):
    if verify_credentials(payload.username, payload.password):
        return {"token": ADMIN_TOKEN}

    raise HTTPException(status_code=401, detail="Invalid credentials")
