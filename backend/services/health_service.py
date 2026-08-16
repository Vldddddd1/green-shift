import asyncio
import httpx

from services.state_service import get_state
from services.forwarding_service import REGION_URLS

POLL_INTERVAL_SECONDS = 5
FAILURE_THRESHOLD = 2
SUCCESS_THRESHOLD = 2
CHECK_TIMEOUT = 2

# server_id -> consecutive checks; positive = consecutive succ; negative = consecutive fails
_streaks: dict[str, int] = {}

async def _check_server(client: httpx.AsyncClient, zone: str, server:str) -> None:
    url = REGION_URLS[server]
    data = get_state()[zone][server]

    try:
        response = await client.get(url, timeout=CHECK_TIMEOUT)
        response.raise_for_status()
        healthy = True
    except (httpx.ConnectError, httpx.TimeoutException, httpx.HTTPStatusError):
        healthy = False

    streak = _streaks.get(server,0)

    if healthy:
        streak = streak + 1 if streak > 0 else 1
        if streak >= SUCCESS_THRESHOLD:
            data["status"] = "online"
    else:
        streak = streak - 1 if streak < 0 else -1
        if -streak >= FAILURE_THRESHOLD:
            data["status"] = "offline"

    _streaks[server] = streak

async def _poll_once() -> None:
    zones = get_state()
    async with httpx.AsyncClient() as client:
        await asyncio.gather(*[
            _check_server(client, zone, server)
            for zone, servers in zones.items()
            for server in servers
        ])

async def health_check_loop() -> None:
    while True:
        await _poll_once()
        await asyncio.sleep(POLL_INTERVAL_SECONDS)