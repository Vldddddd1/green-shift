import pytest
from unittest.mock import patch
import services.state_service as state_service


@pytest.fixture(autouse=True)
def reset_module_state():
    state_service._state = None
    yield
    state_service._state = None


def test_get_state_lazily_loads_and_caches():
    mock_data = {"eu-west": {"eu-west-1": {"carbon_score": 10}}}
    with patch("services.state_service.read_carbon_scores", return_value=mock_data) as mocked_read:
        first = state_service.get_state()
        second = state_service.get_state()

        assert first is second
        mocked_read.assert_called_once()


def test_reset_state_reloads_from_disk():
    first_data = {"eu-west": {"eu-west-1": {"carbon_score": 10}}}
    second_data = {"eu-west": {"eu-west-1": {"carbon_score": 99}}}

    with patch("services.state_service.read_carbon_scores", side_effect=[first_data, second_data]):
        state_service.get_state()
        refreshed = state_service.reset_state()

    assert refreshed == second_data
