from datetime import datetime
from sqlalchemy.orm import Session

from app.db import models
from ..schemas.user import UserRegister

def create_user(db: Session, user: UserRegister):
    exist = db.query(models.User).filter(models.User.email == user.email).first()
    if exist:
        raise ValueError("Employee already exists")
    new_user = models.User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password=user.password,
        cellphone=user.cellphone,
        created_at =datetime.utcnow(),
        updated_at =datetime.utcnow(),
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user