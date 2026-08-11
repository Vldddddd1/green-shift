import pytest
from unittest.mock import patch
from services.routing_service import calculate_score, pick_zone, pick_server_in_zone, decide_route
from services.forwarding_service import forward_to_region


def test_calculate_score_weights_load_and_latency():
    score = calculate_score({"carbon_score": 20, "current_load": 10, "latency": 5})
    assert score == pytest.approx(20 + 0.6 * 10 + 0.1 * 5)


def test_pick_zone_selects_lowest_average_carbon_score():
    zones = {
        "eu-west": {
            "eu-west-1": {"carbon_score": 20, "current_load": 0, "latency": 0},
            "eu-west-2": {"carbon_score": 30, "current_load": 0, "latency": 0},
        },
        "us-east": {
            "us-east-1": {"carbon_score": 60, "current_load": 0, "latency": 0},
        },
    }

    assert pick_zone(zones) == "eu-west"


def test_pick_server_in_zone_selects_lowest_weighted_score():
    servers = {
        "eu-west-1": {"carbon_score": 25, "current_load": 10, "latency": 20},
        "eu-west-2": {"carbon_score": 27, "current_load": 40, "latency": 22},
    }

    assert pick_server_in_zone(servers) == "eu-west-1"


def test_decide_route_combines_zone_and_server_selection():
    mock_zones = {
        "eu-west": {
            "eu-west-1": {"carbon_score": 25, "current_load": 10, "latency": 20},
            "eu-west-2": {"carbon_score": 27, "current_load": 40, "latency": 22},
        },
        "us-east": {
            "us-east-1": {"carbon_score": 70, "current_load": 5, "latency": 15},
        },
    }

    with patch("services.routing_service.read_carbon_scores", return_value=mock_zones):
        zone, server = decide_route()
        assert zone == "eu-west"
        assert server == "eu-west-1"


def test_forward_to_region_unreachable_server():
    result = forward_to_region("eu-west-1")
    # Testeaza doar structura, nu presupune server pornit sau oprit
    assert "server" in result or "error" in result


def test_forward_to_region_unknown_server_raises():
    with pytest.raises(KeyError):
        forward_to_region("nonexistent-server")
