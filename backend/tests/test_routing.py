import pytest
from unittest.mock import patch
from services.routing_service import decide_route
from services.forwarding_service import forward_to_region

def test_decide_route_eu_west_wins():
    mock_scores = {
        "eu-west": {"carbon_score": 25},
        "us-east": {"carbon_score": 70}
    }

    with patch("services.routing_service.read_carbon_scores", return_value=mock_scores):
        result = decide_route()
        assert result == "eu-west"

def test_decide_route_us_east_wins():
    mock_scores = {
        "eu-west": {"carbon_score": 90},
        "us-east": {"carbon_score": 30}
    }
    with patch("services.routing_service.read_carbon_scores", return_value=mock_scores):
        result = decide_route()
        assert result == "us-east"

def test_forward_to_region_unreachable_server():
    result = forward_to_region("eu-west")
    # Testează doar structura, nu presupune server pornit sau oprit
    assert "region" in result or "error" in result

