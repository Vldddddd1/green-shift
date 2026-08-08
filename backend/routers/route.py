
from fastapi import APIRouter
from services.carbon_reader import read_carbon_scores
from services.routing_service import decide_route
from models.schemas import RouteResponse, CarbonScoreResponse
from services.forwarding_service import forward_to_region

router = APIRouter()

@router.get("/carbon", response_model=CarbonScoreResponse)
def get_carbon_scores():
   return {"regions": read_carbon_scores()}

@router.get("/route", response_model=RouteResponse)
def get_route():
    region, scores = decide_route()
    server_response = forward_to_region(region)
    return {"selected_region": region,  "scores": scores, "server_response": server_response}