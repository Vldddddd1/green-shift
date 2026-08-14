stats = {
    "total_requests": 0,
    "requests_per_zone": {},
    "requests_per_server": {},
    "co2_saved": 0.0,
}


def record_request(zone: str, server: str, carbon_score: float):
    stats["total_requests"] += 1

    stats["requests_per_zone"][zone] = stats["requests_per_zone"].get(zone, 0) + 1
    stats["requests_per_server"][server] = stats["requests_per_server"].get(server, 0) + 1


    baseline = 70
    stats["co2_saved"] += max(0, baseline - carbon_score)


def get_stats() -> dict:
    return stats


def reset_stats():
    stats["total_requests"] = 0
    stats["requests_per_server"] = {}
    stats["requests_per_zone"] = {}
    stats["co2_saved"] = 0
