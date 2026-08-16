BASELINE_CARBON_SCORE = 70

stats = {
    "total_requests": 0,
    "requests_per_zone": {},
    "requests_per_server": {},
    "co2_saved": 0.0,
    "latency_sum": 0.0,
}

def record_request(zone: str, server: str, carbon_score: float, latency: float):

    stats["total_requests"] += 1

    stats["requests_per_zone"][zone] = stats["requests_per_zone"].get(zone, 0) + 1
    stats["requests_per_server"][server] = stats["requests_per_server"].get(server, 0) + 1


    stats["co2_saved"] += max(0, BASELINE_CARBON_SCORE - carbon_score)
    stats["latency_sum"] += latency

def get_stats() -> dict:
    total = stats["total_requests"]
    average_latency_ms = stats["latency_sum"] / total if total > 0 else None
    carbon_reduction_percent = (
        (stats["co2_saved"] / (total * BASELINE_CARBON_SCORE)) * 100
        if total > 0 else None
    )
    return {
        **stats,
        "average_latency_ms": round(average_latency_ms, 1) if average_latency_ms is not None else None,
        "carbon_reduction_percent": round(carbon_reduction_percent, 1) if carbon_reduction_percent is not None else None,
    }

def reset_stats():
    stats["total_requests"] = 0
    stats["requests_per_server"] = {}
    stats["requests_per_zone"] = {}
    stats["co2_saved"] = 0
    stats["latency_sum"] = 0
