from fastapi import APIRouter
from pydantic import BaseModel

from apps.backend.app.db import database
from apps.backend.app.dto.users import UserDto
from apps.backend.app.services import user_service


router = APIRouter(prefix="/users")


class CreateUserPayload(BaseModel):
    user: UserDto


@router.get("/register")
async def create_user(payload: CreateUserPayload):
    with database.get_db() as session:
        user = user_service.create_user(session, payload.user)
        return user
    
  
  