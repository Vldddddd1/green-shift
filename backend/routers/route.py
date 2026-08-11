
from fastapi import APIRouter
from services.carbon_reader import read_carbon_scores
from services.routing_service import decide_route
from models.schemas import RouteResponse, CarbonScoreResponse
from services.forwarding_service import forward_to_region

router = APIRouter()

@router.get("/carbon", response_model=CarbonScoreResponse)
def get_carbon_scores():
    return {"zones": read_carbon_scores()}

@router.get("/route", response_model=RouteResponse)
def get_route():
    zone, server = decide_route()
    server_response = forward_to_region(server)
    return {"selected_zone": zone,  "selected_server": server, "server_response": server_response}