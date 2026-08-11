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
    mock_scores = {
        "eu-west": {"carbon_score": 25},
        "us-east": {"carbon_score": 70},
    }
    with patch("routers.route.read_carbon_scores", return_value=mock_scores):
        response = client.get("/carbon")
        assert response.status_code == 200
        assert response.json() == {"regions": mock_scores}


def test_get_route_selects_eu_west():
    with patch("routers.route.decide_route", return_value="eu-west"), \
         patch("routers.route.forward_to_region", return_value={"region": "eu-west"}):
        response = client.get("/route")
        assert response.status_code == 200
        data = response.json()
        assert data["selected_region"] == "eu-west"
        assert data["server_response"] == {"region": "eu-west"}


def test_get_route_reports_unreachable_server():
    with patch("routers.route.decide_route", return_value="us-east"), \
         patch("routers.route.forward_to_region", return_value={"error": "us-east server unreachable"}):
        response = client.get("/route")
        assert response.status_code == 200
        data = response.json()
        assert data["selected_region"] == "us-east"
        assert data["server_response"] == {"error": "us-east server unreachable"}
