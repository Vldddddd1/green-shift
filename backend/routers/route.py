from fastapi import APIRouter
from services.routing_service import decide_route, update_load_after_request
from models.schemas import RouteResponse, ServerResponse
from services.forwarding_service import forward_to_region
from services.stats_service import record_request, get_stats, BASELINE_CARBON_SCORE
from services.state_service import get_state

from datetime import datetime, timezone

router = APIRouter()


@router.get("/servers", response_model=ServerResponse)
def get_servers():
    return {"zones": get_state()}


@router.get("/route", response_model=RouteResponse)
def get_route():
    zone, server = decide_route()
    get_state()[zone][server]["last_selected"] = datetime.now(timezone.utc).isoformat()
    server_response = forward_to_region(server)

    update_load_after_request(zone, server)

    carbon_score = get_state()[zone][server]["carbon_score"]
    latency = get_state()[zone][server]["latency"]
    record_request(zone, server, carbon_score, latency)

    savings_multiplier = BASELINE_CARBON_SCORE / carbon_score if carbon_score > 0 else 1.0

    return {
        "selected_zone": zone,
        "selected_server": server,
        "server_response": server_response,
        "carbon_saved_kg": get_stats()["co2_saved"],
        "savings_multiplier": round(savings_multiplier,2),
    }


@router.get("/stats")
def stats():
    return get_stats()
