from services.carbon_reader import read_carbon_scores
from services.state_service import get_state, increment_and_check_batch



def calculate_score(server_data: dict) -> float:

    return(server_data["carbon_score"] + 0.6 * server_data["current_load"] + 0.1 * server_data["latency"])

def pick_zone(zones: dict) -> str:

    zone_avg_carbon = {}
    for zone_name, servers in zones.items():
        online_servers = {name: data for name, data in servers.items() if data["status"] == "online"}
        if not online_servers:
            continue
        avg = (sum(s["carbon_score"] for s in online_servers.values()) / len(online_servers)
                + 0.3 * (sum(s["current_load"] for s in online_servers.values()) / len(online_servers)))
        zone_avg_carbon[zone_name] = avg

    if not zone_avg_carbon:
        raise RuntimeError("No online servers available in any zone")
    
    return min(zone_avg_carbon, key=zone_avg_carbon.get)

def pick_server_in_zone(servers: dict) -> str:
    online_servers = {name: data for name, data in servers.items() if data["status"] == "online"}
    if not online_servers:
        return None 
    
    server_score = {  name: calculate_score(data) for name, data in online_servers.items()}

    return min(server_score, key = server_score.get)

def decide_route(target_zone: str | None = None) -> tuple[str, str]:
    zones = get_state()

    if target_zone is not None:
        if target_zone not in zones:
            raise ValueError(f"Unknown zone {target_zone}")
        zones = {target_zone: zones[target_zone]}

    best_zone = pick_zone(zones)
    best_server = pick_server_in_zone(zones[best_zone])

    if best_server is None:
        raise RuntimeError(f"No online servers available in zone {best_zone}")
    
    
    return best_zone, best_server

def update_load_after_request(selected_zone: str, selected_server: str):

    zones = get_state()
    winner_data = zones[selected_zone][selected_server]
    winner_data["current_load"] = min(100, winner_data["current_load"] + 5)

    if increment_and_check_batch(50):
        for zone_name, servers in zones.items():
            for server_name, data in servers.items():
                if server_name != selected_server:
                    data["current_load"] = max(0, data["current_load"] - 2)

if __name__ == "__main__": 
    print(decide_route())