from fastapi import APIRouter
from pydantic import BaseModel

from app.db import database
from ..schemas.user import UserRegister
from app.services import user_service


router = APIRouter(prefix="/users")



@router.post("/auth/register")
async def create_user(payload: UserRegister):
    print("Received request to create user", payload)
    with database.get_db() as session:
        print(f"Payload received: {payload}")
        user = user_service.create_user(session, payload)
        return user
    