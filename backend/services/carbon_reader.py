import json

def read_carbon_scores(path: str = "data/carbon_scores.json") -> dict:
    with open(path, "r") as f:
        data = json.load(f)
    return data["regions"]
if __name__ == "__main__":
    print(read_carbon_scores())