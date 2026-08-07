from pydantic import BaseModel

class RouteResponse(BaseModel):
    selected_region: str
    server_response: dict

class RegionData(BaseModel):
    carbon_score: int

class CarbonScoreResponse(BaseModel):
    regions: dict[str, RegionData]