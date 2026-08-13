from services.carbon_reader import read_carbon_scores
from services.state_service import get_state



def calculate_score(server_data: dict) -> float:

    return(server_data["carbon_score"] + 0.6 * server_data["current_load"] + 0.1 * server_data["latency"])

def pick_zone(zones: dict) -> str:

    zone_avg_carbon = { zone_name: sum(s["carbon_score"] for s in servers.values()) / len(servers) 
                       + 0.3 * (sum(s["current_load"] for s in servers.values()) / len(servers))
                       for zone_name, servers in zones.items()}
    
    return min(zone_avg_carbon, key=zone_avg_carbon.get)

def pick_server_in_zone(servers: dict) -> str:
    server_score = {  server_name: calculate_score(data)
                     for server_name, data in servers.items()

    }

    return min(server_score, key = server_score.get)

def decide_route() -> tuple[str, str]:

    zones = get_state()

    best_zone = pick_zone(zones)
    best_server = pick_server_in_zone(zones[best_zone])
    
    return best_zone, best_server

def update_load_after_request(selected_zone: str, selected_server: str):

    zones = get_state()
    for zone_name, servers in zones.items():
        for server_name, data in servers.items():
            if server_name == selected_server:
                data["current_load"] = min(100, data["current_load"] + 5)
            elif zone_name != selected_zone:
                data["current_load"] = max(0, data["current_load"] - 2)



if __name__ == "__main__": 
    print(decide_route())