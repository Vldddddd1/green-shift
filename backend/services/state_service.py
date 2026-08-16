from services.carbon_reader import read_carbon_scores

_state = None
_request_counter = 0

def get_state() -> dict:

    global _state
    if _state is None:
        _state = read_carbon_scores()
    return _state

def reset_state() -> dict:

    global _state
    _state = read_carbon_scores()

def increment_and_check_batch(batch_size: int = 50) -> bool:
    global _request_counter
    _request_counter += 1
    return _request_counter % batch_size == 0