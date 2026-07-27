
from fastapi import APIRouter
from services.carbon_reader import read_carbon_scores
from services.routing_service import decide_route

router = APIRouter()

@router.get("/carbon")
def get_carbon_scores():
    return read_carbon_scores()

@router.get("/route")
def get_route():
    return {"selected_region": decide_route()}