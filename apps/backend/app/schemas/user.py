from pydantic import BaseModel, EmailStr

def to_camel(string: str) -> str:
    parts = string.split("_")
    return parts[0] + "".join(word.capitalize() for word in parts[1:])

# Request
class UserRegister(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    cellphone: str
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
