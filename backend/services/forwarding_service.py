import httpx


REGION_URLS = {

    "eu-west": "http://127.0.0.1:8001",
    "us-east": "http://127.0.0.1:8002"
}

def forward_to_region(region: str) -> dict:
    url = REGION_URLS[region]
    response = httpx.get(url)
    return response.json()

