from fastapi import APIRouter, HTTPException
from services.state_service import get_state
from models.schemas import UpdateCarbonScore

router = APIRouter(prefix = "/admin")

@router.patch("/carbon-score")

def update_carbon_score(payload: UpdateCarbonScore):
    zones = get_state()

    if payload.zone not in zones or payload.server not in zones[payload.zone]:
        raise HTTPException(status_code=404, detail="Zone or server not found")

    zones[payload.zone][payload.server]["carbon_score"] = payload.carbon_score
    return {"status":"updated"}