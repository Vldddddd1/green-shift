from services.carbon_reader import read_carbon_scores

_state = None
_carbon_saved_kg = 0.0

def get_state() -> dict:

    global _state
    if _state is None:
        _state = read_carbon_scores()
    return _state

def reset_state() -> dict:

    global _state, _carbon_saved_kg
    _state = read_carbon_scores()
    _carbon_saved_kg = 0.0

def record_carbon_saved(amount_kg: float) -> float:

    global _carbon_saved_kg
    _carbon_saved_kg += amount_kg
    return _carbon_saved_kg

def get_carbon_saved_kg() -> float:
    return _carbon_saved_kg