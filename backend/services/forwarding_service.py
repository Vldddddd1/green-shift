import httpx


REGION_URLS = {
    "eu-west-1": "http://eu-west-1:8000",
    "eu-west-2": "http://eu-west-2:8000",
    "us-east-1": "http://us-east-1:8000",
    "us-east-2": "http://us-east-2:8000"
}

def forward_to_region(server: str) -> dict:
    url = REGION_URLS[server]
    try: 
        response = httpx.get(url, timeout=3.0)
        response.raise_for_status()
        return response.json()
    except httpx.ConnectError:
        return {"error": f"{server} server unreachable"}
    except httpx.TimeoutException:
        return {"error":f"{server} server timed out"}
    except httpx.HTTPStatusError as e:
        return {"error": f"{server} server returned status {e.response.status_code}"}

