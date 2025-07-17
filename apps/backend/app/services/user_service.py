from sqlalchemy.orm import Session
from apps.backend.app.db import models
from apps.backend.app.dto.users import UserDto


def create_user(db: Session, user: UserDto):
    print(f"Creating employee: {user.first_name}")
    exist = db.query(models.User).filter(models.User.email == user.email).first()
    if exist:
        raise ValueError("Employee already exists")
    new_user = models.User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password=user.password,
        cellphone=user.cellphone
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user