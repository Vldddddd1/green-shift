from pydantic import BaseModel

class RouteResponse(BaseModel):
    selected_zone: str
    selected_server: str
    server_response: dict
    carbon_saved_kg: float
    savings_multiplier: float

class ServerData(BaseModel):
    carbon_score: int
    current_load: int
    latency: int
    status: str

class CarbonScoreResponse(BaseModel):
    zones: dict[str, dict[str, ServerData]]