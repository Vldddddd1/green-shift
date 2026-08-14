import pytest
import services.stats_service as stats_service


@pytest.fixture(autouse=True)
def reset_stats_between_tests():
    stats_service.reset_stats()
    yield
    stats_service.reset_stats()


def test_record_request_increments_total_and_per_zone_and_per_server():
    stats_service.record_request("eu-west", "eu-west-1", carbon_score=20)
    stats_service.record_request("eu-west", "eu-west-1", carbon_score=20)
    stats_service.record_request("us-east", "us-east-1", carbon_score=42)

    stats = stats_service.get_stats()

    assert stats["total_requests"] == 3
    assert stats["requests_per_zone"] == {"eu-west": 2, "us-east": 1}
    assert stats["requests_per_server"] == {"eu-west-1": 2, "us-east-1": 1}


def test_record_request_accumulates_co2_saved_against_baseline():
    stats_service.record_request("eu-west", "eu-west-1", carbon_score=20)

    assert stats_service.get_stats()["co2_saved"] == pytest.approx(50)


def test_record_request_does_not_go_negative_when_carbon_score_exceeds_baseline():
    stats_service.record_request("asia-east", "asia-east-3", carbon_score=90)

    assert stats_service.get_stats()["co2_saved"] == 0


def test_reset_stats_clears_everything():
    stats_service.record_request("eu-west", "eu-west-1", carbon_score=20)

    stats_service.reset_stats()

    assert stats_service.get_stats() == {
        "total_requests": 0,
        "requests_per_zone": {},
        "requests_per_server": {},
        "co2_saved": 0,
    }
