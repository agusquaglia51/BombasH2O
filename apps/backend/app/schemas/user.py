from typing import Optional
from pydantic import BaseModel, EmailStr

def to_camel(string: str) -> str:
    parts = string.split("_")
    return parts[0] + "".join(word.capitalize() for word in parts[1:])

# Request
class UserRegister(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    cellphone: Optional[str] = None
    password: str

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True

# Response
class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    cellphone: str

    class Config:
        orm_mode = True  # permite convertir un modelo SQLAlchemy a JSON
        alias_generator = to_camel
        allow_population_by_field_name = True


class LoginUserRequest(BaseModel):
    email: str
    password: str
    
    
class UserLoginOut(BaseModel):
    email: EmailStr
    first_name: str 
    
class LoginResponse(BaseModel):
    message: str
    user: UserLoginOut

class User(BaseModel):
    email: EmailStr
    name: str

class UserVerifiedOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    is_email_verified: bool

    class Config:
        orm_mode = True


class UserVerificationResponse(BaseModel):
    message: str
    user: UserVerifiedOut
    