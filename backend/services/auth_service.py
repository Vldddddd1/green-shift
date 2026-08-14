from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "greenshift2026"
ADMIN_TOKEN = "gs-admin-secret-token"


security = HTTPBearer()


def verify_credentials(username: str, password: str) -> bool:
    return username == ADMIN_USERNAME and password == ADMIN_PASSWORD


def verify_token(token: str) -> bool:
    return token == ADMIN_TOKEN


def require_auth(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if credentials.scheme.lower() != "bearer":
        raise HTTPException(status_code=401, detail="Unauthorized")

    if not verify_token(credentials.credentials):
        raise HTTPException(status_code=401, detail="Unauthorized")
