from sqlalchemy import Column, DateTime, Integer, String
from datetime import datetime

from apps.backend.app.db.database import Base


class User(Base):
    _table_name_ = "users"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    cellphone = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Product(Base):
    _table_name_ = "products"
    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String, index=True)
    product_description = Column(String)
    product_price = Column(Integer)
    product_quantity = Column(Integer)
    product_category = Column(String, index=True)
    product_image = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    product_status = Column(String, default="active")