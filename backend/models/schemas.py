from pydantic import BaseModel

class RouteResponse(BaseModel):
    selected_region: str
    server_response: dict

class RegionData(BaseModel):
    carbon_score: int
    current_load: int
    latency: int
    status: str

class CarbonScoreResponse(BaseModel):
    regions: dict[str, RegionData]