import json
from pathlib import Path

import pytest
from services.carbon_reader import read_carbon_scores

BACKEND_DIR = Path(__file__).resolve().parents[2] / "backend"


def test_read_carbon_scores_real_data_file():
    data = read_carbon_scores(str(BACKEND_DIR / "data" / "carbon_scores.json"))

    assert set(data.keys()) == {"eu-west", "us-east"}
    assert set(data["eu-west"].keys()) == {"eu-west-1", "eu-west-2"}
    assert data["eu-west"]["eu-west-1"]["carbon_score"] == 25


def test_read_carbon_scores_custom_file(tmp_path):
    payload = {
        "zones": {
            "eu-west": {
                "eu-west-1": {"carbon_score": 10, "current_load": 1, "latency": 1, "status": "online"},
            },
            "us-east": {
                "us-east-1": {"carbon_score": 99, "current_load": 9, "latency": 9, "status": "online"},
            },
        }
    }
    file_path = tmp_path / "scores.json"
    file_path.write_text(json.dumps(payload))

    data = read_carbon_scores(str(file_path))

    assert data == payload["zones"]


def test_read_carbon_scores_missing_file():
    with pytest.raises(FileNotFoundError):
        read_carbon_scores(str(Path("nonexistent") / "path" / "scores.json"))


def test_read_carbon_scores_malformed_json(tmp_path):
    file_path = tmp_path / "bad.json"
    file_path.write_text("{not valid json")

    with pytest.raises(json.JSONDecodeError):
        read_carbon_scores(str(file_path))


def test_read_carbon_scores_missing_zones_key(tmp_path):
    file_path = tmp_path / "no_zones.json"
    file_path.write_text(json.dumps({"foo": "bar"}))

    with pytest.raises(KeyError):
        read_carbon_scores(str(file_path))
