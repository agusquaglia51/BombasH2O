from pydantic import BaseModel


class UserDto(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str
    cellphone: str
    