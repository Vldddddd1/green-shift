
from fastapi import APIRouter
from services.routing_service import decide_route, update_load_after_request
from models.schemas import RouteResponse, CarbonScoreResponse
from services.forwarding_service import forward_to_region
from services.state_service import get_state

router = APIRouter()

@router.get("/carbon", response_model=CarbonScoreResponse)
def get_carbon_scores():
   return {"zones": get_state()}

@router.get("/route", response_model=RouteResponse)
def get_route():
    zone, server = decide_route()
    server_response = forward_to_region(server)

    update_load_after_request(zone, server)
    
    return {"selected_zone": zone,  "selected_server": server, "server_response": server_response}