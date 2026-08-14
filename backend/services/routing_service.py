from services.carbon_reader import read_carbon_scores
from services.state_service import get_state



def calculate_score(server_data: dict) -> float:

    return(server_data["carbon_score"] + 0.6 * server_data["current_load"] + 0.1 * server_data["latency"])

def pick_zone(zones: dict) -> str:

<<<<<<< HEAD
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
=======
    zone_avg_carbon = { zone_name: sum(s["carbon_score"] for s in servers.values()) / len(servers) 
                       + 0.3 * (sum(s["current_load"] for s in servers.values()) / len(servers))
                       for zone_name, servers in zones.items()}
>>>>>>> 39355409c52e75a89790b2caf0515c12d2d71f14
    
    return min(zone_avg_carbon, key=zone_avg_carbon.get)

def pick_server_in_zone(servers: dict) -> str:
    online_servers = {name: data for name, data in servers.items() if data["status"] == "online"}
    server_score = {  name: calculate_score(data) for name, data in online_servers.items()}

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