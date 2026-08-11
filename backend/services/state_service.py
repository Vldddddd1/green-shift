from services.carbon_reader import read_carbon_scores

_state = None

def get_state() -> dict:

    global _state
    if _state is None:
        _state = read_carbon_scores()
    return _state

def reset_state() -> dict:

    global _state
    _state = read_carbon_scores()