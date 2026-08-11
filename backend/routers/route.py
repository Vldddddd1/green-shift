from fastapi import APIRouter
from services.routing_service import (
    decide_route,
    update_load_after_request,
    is_lower_carbon_zone,
    CARBON_SAVED_PER_REQUEST_KG,
    SAVINGS_MULTIPLIER,
)
from models.schemas import RouteResponse, CarbonScoreResponse
from services.forwarding_service import forward_to_region
from services.state_service import get_state, record_carbon_saved, get_carbon_saved_kg

router = APIRouter()


@router.get("/carbon", response_model=CarbonScoreResponse)
def get_carbon():
    return {"zones": get_state()}


@router.get("/route", response_model=RouteResponse)
def get_route():
    zone, server = decide_route()
    server_response = forward_to_region(server)

    routed_to_lower_carbon = is_lower_carbon_zone(get_state(), zone)
    if routed_to_lower_carbon:
        record_carbon_saved(CARBON_SAVED_PER_REQUEST_KG)

    update_load_after_request(zone, server)

    return {
        "selected_zone": zone,
        "selected_server": server,
        "server_response": server_response,
        "carbon_saved_kg": round(get_carbon_saved_kg(), 2),
        "savings_multiplier": SAVINGS_MULTIPLIER if routed_to_lower_carbon else 1.0,
    }