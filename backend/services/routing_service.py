from services.carbon_reader import read_carbon_scores



def calculate_score(region_data: dict) -> float:

    return(region_data["carbon_score"] + 0.6 * region_data["current_load"] + 0.1 * region_data["latency"])

def decide_route() -> str:
    scores = read_carbon_scores()
    
    region_scores = {
        region: calculate_score(data)
        for region, data in scores.items()
    }
    
    best_region = min(region_scores, key=region_scores.get)
    return best_region, region_scores

if __name__ == "__main__": 
    print(decide_route())