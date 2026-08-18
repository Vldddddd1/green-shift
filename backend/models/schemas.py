from pydantic import BaseModel, Field

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
    last_selected: str | None = None
    manual_override: bool = False

class ServerResponse(BaseModel):
    zones: dict[str, dict[str, ServerData]]

class UpdateCarbonScoreRequest(BaseModel):
    zone: str
    server: str
    carbon_score: int


class UpdateLoadRequest(BaseModel):
    zone: str
    server: str
    current_load: int

class UpdateLatencyRequest(BaseModel):
    zone: str
    server: str
    latency: int

class UpdateStatusRequest(BaseModel):
    zone: str
    server: str
    status: str

class SimulateRequest(BaseModel):
    count: int = Field(..., ge = 1, le = 300)
    zone: str | None = None

class LoginRequest(BaseModel):
    username: str
    password: str