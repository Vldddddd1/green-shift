from fastapi import APIRouter
from services.routing_service import decide_route, update_load_after_request
from models.schemas import RouteResponse, ServerResponse
from services.forwarding_service import forward_to_region
from services.stats_service import record_request, get_stats
from services.state_service import get_state

router = APIRouter()


@router.get("/servers", response_model=ServerResponse)
def get_servers():
    return {"zones": get_state()}


@router.get("/route", response_model=RouteResponse)
def get_route():
    zone, server = decide_route()
    server_response = forward_to_region(server)

    update_load_after_request(zone, server)

    carbon_score = get_state()[zone][server]["carbon_score"]
    record_request(zone, server, carbon_score)

    return {
        "selected_zone": zone,
        "selected_server": server,
        "server_response": server_response,
    }


@router.get("/stats")
def stats():
    return get_stats()
