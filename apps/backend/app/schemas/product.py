from pydantic import BaseModel
from datetime import datetime


def to_camel(string: str) -> str:
    parts = string.split("_")
    return parts[0] + "".join(word.capitalize() for word in parts[1:])


# Request para crear producto
class ProductCreate(BaseModel):
    product_name: str
    product_description: str
    product_price: float
    product_quantity: int
    product_category: str
    product_image: str

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True


# Request para actualizar producto
class ProductUpdate(BaseModel):
    product_name: str | None = None
    product_description: str | None = None
    product_price: float | None = None
    product_quantity: int | None = None
    product_category: str | None = None
    product_image: str | None = None
    product_status: str | None = None

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True


# Response al devolver producto
class ProductResponse(BaseModel):
    id: int
    product_name: str
    product_description: str
    product_price: float
    product_quantity: int
    product_category: str
    product_image: str
    created_at: datetime
    updated_at: datetime
    product_status: str

    class Config:
        orm_mode = True
        alias_generator = to_camel
        allow_population_by_field_name = True
