import pytest
from unittest.mock import patch
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "Green-Shift backend is alive"}


def test_get_carbon_scores():
    mock_zones = {
        "eu-west": {
            "eu-west-1": {"carbon_score": 25, "current_load": 10, "latency": 20, "status": "online"},
            "eu-west-2": {"carbon_score": 27, "current_load": 40, "latency": 22, "status": "online"},
        },
        "us-east": {
            "us-east-1": {"carbon_score": 70, "current_load": 5, "latency": 15, "status": "online"},
        },
    }
    with patch("routers.route.read_carbon_scores", return_value=mock_zones):
        response = client.get("/carbon")
        assert response.status_code == 200
        assert response.json() == {"zones": mock_zones}


def test_get_route_selects_eu_west():
    with patch("routers.route.decide_route", return_value=("eu-west", "eu-west-1")), \
         patch(
             "routers.route.forward_to_region",
             return_value={"server": "eu-west-1", "zone": "eu-west", "status": "ok"},
         ):
        response = client.get("/route")
        assert response.status_code == 200
        data = response.json()
        assert data["selected_zone"] == "eu-west"
        assert data["selected_server"] == "eu-west-1"
        assert data["server_response"] == {"server": "eu-west-1", "zone": "eu-west", "status": "ok"}


def test_get_route_reports_unreachable_server():
    with patch("routers.route.decide_route", return_value=("us-east", "us-east-1")), \
         patch(
             "routers.route.forward_to_region",
             return_value={"error": "us-east-1 server unreachable"},
         ):
        response = client.get("/route")
        assert response.status_code == 200
        data = response.json()
        assert data["selected_zone"] == "us-east"
        assert data["selected_server"] == "us-east-1"
        assert data["server_response"] == {"error": "us-east-1 server unreachable"}
