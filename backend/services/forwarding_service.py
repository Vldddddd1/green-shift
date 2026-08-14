import httpx


REGION_URLS = {
    "eu-west-1": "http://eu-west-1:8000",
    "eu-west-2": "http://eu-west-2:8000",
    "eu-west-3": "http://eu-west-3:8000",
    "eu-west-4": "http://eu-west-4:8000",
<<<<<<< HEAD
    "eu-central-1": "http://eu-central-1:8000",
    "eu-central-2": "http://eu-central-2:8000",
    "eu-central-3": "http://eu-central-3:8000",
    "eu-central-4": "http://eu-central-4:8000",
    "af-south-1": "http://af-south-1:8000",
    "af-south-2": "http://af-south-2:8000",
    "af-south-3": "http://af-south-3:8000",
=======
    "us-west-1": "http://us-west-1:8000",
    "us-west-2": "http://us-west-2:8000",
    "us-west-3": "http://us-west-3:8000",
    "us-west-4": "http://us-west-4:8000",
    "eu-east-1": "http://eu-east-1:8000",
    "eu-east-2": "http://eu-east-2:8000",
    "eu-east-3": "http://eu-east-3:8000",
    "eu-east-4": "http://eu-east-4:8000",
    "africa-1": "http://africa-1:8000",
    "africa-2": "http://africa-2:8000",
    "africa-3": "http://africa-3:8000",
>>>>>>> 39355409c52e75a89790b2caf0515c12d2d71f14
    "us-east-1": "http://us-east-1:8000",
    "us-east-2": "http://us-east-2:8000",
    "us-east-3": "http://us-east-3:8000",
    "us-east-4": "http://us-east-4:8000",
<<<<<<< HEAD
    "us-west-1": "http://us-west-1:8000",
    "us-west-2": "http://us-west-2:8000",
    "us-west-3": "http://us-west-3:8000",
    "us-west-4": "http://us-west-4:8000",
    "ap-south-1": "http://ap-south-1:8000",
    "ap-south-2": "http://ap-south-2:8000",
    "ap-south-3": "http://ap-south-3:8000",
    "ap-southeast-1": "http://ap-southeast-1:8000", #australia
    "ap-southeast-2": "http://ap-southeast-2:8000",
    "ap-northeast-1": "http://ap-northeast-1:8000",
    "ap-northeast-2": "http://ap-northeast-2:8000",
    "ap-northeast-3": "http://ap-northeast-3:8000"
=======
    "asia-south-1": "http://asia-south-1:8000",
    "asia-south-2": "http://asia-south-2:8000",
    "asia-south-3": "http://asia-south-3:8000",
    "australia-1": "http://australia-1:8000",
    "australia-2": "http://australia-2:8000",
    "asia-east-1": "http://asia-east-1:8000",
    "asia-east-2": "http://asia-east-2:8000",
    "asia-east-3": "http://asia-east-3:8000"
>>>>>>> 39355409c52e75a89790b2caf0515c12d2d71f14
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

