import httpx


REGION_URLS = {

    "eu-west": "http://127.0.0.1:8001",
    "us-east": "http://127.0.0.1:8002"
}

def forward_to_region(region: str) -> dict:
    url = REGION_URLS[region]
    try: 
        response = httpx.get(url, timeout=3.0)
        response.raise_for_status()
        return response.json()
    except httpx.ConnectError:
        return {"error": f"{region} server unreachable"}
    except httpx.TimeoutException:
        return {"error":f"{region} server timed out"}
    except httpx.HTTPStatusError as e:
        return {"error": f"{region} server returned status {e.response.status_code}"}

