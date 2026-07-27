from services.carbon_reader import read_carbon_scores

def decide_route() -> str:
    scores = read_carbon_scores()
    
    eu_score = scores["eu-west"]["carbon_score"]
    us_score = scores["us-east"]["carbon_score"]
    
    if eu_score <= us_score:
        return "eu-west"
    else:
        return "us-east"
