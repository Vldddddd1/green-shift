from fastapi import APIRouter, HTTPException
from services.state_service import get_state, reset_state
from services.routing_service import decide_route, update_load_after_request
from services.forwarding_service import forward_to_region
from models.schemas import (UpdateCarbonScoreRequest, UpdateLoadRequest, UpdateStatusRequest, UpdateLatencyRequest, SimulateRequest )

router = APIRouter(prefix = "/admin")

@router.patch("/carbon-score")
def update_carbon_score(payload: UpdateCarbonScoreRequest):
    zones = get_state()
    if payload.zone not in zones or payload.server not in zones[payload.zone]:
        raise HTTPException(status_code=404, detail="Zone or server not found")

    zones[payload.zone][payload.server]["carbon_score"] = payload.carbon_score
    return {"status":"updated"}


@router.patch("/load")
def update_load(payload: UpdateLoadRequest):
    zones = get_state()
    if payload.zone not in zones or payload.server not in zones[payload.zone]:
        raise HTTPException(status_code=404, detail="Zone or server not found")

    zones[payload.zone][payload.server]["current_load"] = payload.current_load
    return{"status":"updated"}

@router.patch("/latency")
def update_latency(payload: UpdateLatencyRequest):
    zones = get_state()
    if payload.zone not in zones or payload.server not in zones[payload.zone]:
        raise HTTPException(status_code=404, detail="Zone or server not found")
    zones[payload.zone][payload.server]["latency"] = payload.latency
    return{"status":"updated"}

@router.patch("/status")
def update_status(payload: UpdateStatusRequest):
     zones = get_state()
     if payload.zone not in zones or payload.server not in zones[payload.zone]:
        raise HTTPException(status_code=404, detail="Zone or server not found")

     zones[payload.zone][payload.server]["status"] = payload.status
     return{"status":"updated"}

@router.post("/simulate")
def simulate_requests(payload: SimulateRequest):
    results = []
    for _ in range(payload.count):
        zone, server = decide_route()
        forward_to_region(server)
        update_load_after_request(zone, server)
        results.append({"zone":zone, "server":server})

    return {"simulated": payload.count, "results":results }

@router.post("/reset")
def reset_everything():
    reset_state()

    return{"status": "reset"}



