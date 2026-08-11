import importlib.util
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

ROOT = Path(__file__).resolve().parents[2]
SERVER_MAIN = ROOT / "server" / "main.py"


def _load_server_app():
    spec = importlib.util.spec_from_file_location("server_main", SERVER_MAIN)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.app


@pytest.mark.parametrize(
    "server_name,zone",
    [
        ("eu-west-1", "eu-west"),
        ("eu-west-2", "eu-west"),
        ("us-east-1", "us-east"),
        ("us-east-2", "us-east"),
    ],
)
def test_server_status_endpoint_reports_its_identity(monkeypatch, server_name, zone):
    monkeypatch.setenv("SERVER_NAME", server_name)
    monkeypatch.setenv("ZONE", zone)

    client = TestClient(_load_server_app())
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {"server": server_name, "zone": zone, "status": "ok"}


def test_server_status_endpoint_defaults_to_unknown(monkeypatch):
    monkeypatch.delenv("SERVER_NAME", raising=False)
    monkeypatch.delenv("ZONE", raising=False)

    client = TestClient(_load_server_app())
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {"server": "unknown", "zone": "unknown", "status": "ok"}
