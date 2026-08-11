import importlib.util
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

ROOT = Path(__file__).resolve().parents[2]


def _load_region_app(region_dir: str):
    module_path = ROOT / region_dir / "main.py"
    spec = importlib.util.spec_from_file_location(f"{region_dir.replace('-', '_')}_main", module_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.app


@pytest.mark.parametrize(
    "region_dir,expected_region",
    [
        ("region-eu-west", "eu-west"),
        ("region-us-east", "us-east"),
    ],
)
def test_region_status_endpoint(region_dir, expected_region):
    client = TestClient(_load_region_app(region_dir))

    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {"region": expected_region, "status": "ok"}
