from pydantic import BaseModel


class Products(BaseModel):
    product_id: int
    product_name: str
    product_description: str
    product_price: float
    product_quantity: int
    product_category: str
    product_image: str
    product_created_at: str
    product_updated_at: str
    product_status: str
