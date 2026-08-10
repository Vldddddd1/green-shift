from services.carbon_reader import read_carbon_scores



def calculate_score(server_data: dict) -> float:

    return(server_data["carbon_score"] + 0.6 * server_data["current_load"] + 0.1 * server_data["latency"])

def pick_zone(zones: dict) -> str:
    zone_avg_carbon = { zone_name: sum(s["carbon_score"] for s in servers.values()) / len(servers)
                       for zone_name, servers in zones.items()}
    return min(zone_avg_carbon, key=zone_avg_carbon.get)

def pick_server_in_zone(servers: dict) -> str:
    server_score = {  server_name: calculate_score(data)
                     for server_name, data in servers.items()

    }

    return min(server_score, key = server_score.get)

def decide_route() -> tuple[str, str]:
    zones = read_carbon_scores()

    best_zone = pick_zone(zones)
    best_server = pick_server_in_zone(zones[best_zone])
    
    return best_zone, best_server

if __name__ == "__main__": 
    print(decide_route())