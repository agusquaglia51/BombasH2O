# app/services/user_service.py
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from fastapi import HTTPException
from typing import Optional

from app.db import models
from ..schemas.user import UserRegister
from ..services.email_service import email_service

# Password hashing configuration
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

async def create_user(db: Session, user: UserRegister):
    """
    Create a new user and send verification email.
    The user is saved in DB with is_email_verified=False.
    """
    # Check if user exists
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        if existing_user.is_email_verified:
            raise HTTPException(status_code=400, detail="User with this email already exists")
        else:
            # Allow re-sending verification email
            return await resend_verification_email(db, existing_user)

    # Hash password
    hashed_password = hash_password(user.password)

    # Generate verification token
    verification_token = email_service.generate_verification_token(user.email)
    verification_expires_at = datetime.utcnow() + timedelta(hours=24)

    # Create user in DB
    new_user = models.User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password=hashed_password,
        cellphone=user.cellphone,
        is_email_verified=False,
        email_verification_token=verification_token,
        email_verification_sent_at=datetime.utcnow(),
        email_verification_expires_at=verification_expires_at,
        verification_attempts=1,
        last_verification_attempt=datetime.utcnow(),
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Send verification email
    email_sent = await email_service.send_verification_email(
        email=new_user.email,
        first_name=new_user.first_name,
        verification_token=verification_token
    )
    if not email_sent:
        print(f"Warning: Failed to send verification email to {new_user.email}")

    # Return user info (without password)
    return {
        "id": new_user.id,
        "first_name": new_user.first_name,
        "last_name": new_user.last_name,
        "email": new_user.email,
        "cellphone": new_user.cellphone,
        "is_email_verified": new_user.is_email_verified,
        "email_verification_sent": email_sent,
        "created_at": new_user.created_at
    }


async def resend_verification_email(db: Session, user: models.User):
    """Resend verification email for unverified users"""
    if user.verification_attempts >= 5:
        last_attempt = user.last_verification_attempt
        if last_attempt and (datetime.utcnow() - last_attempt) < timedelta(days=1):
            raise HTTPException(
                status_code=429,
                detail="Maximum verification attempts reached. Please try again tomorrow."
            )
        else:
            user.verification_attempts = 0

    verification_token = email_service.generate_verification_token(user.email)
    verification_expires_at = datetime.utcnow() + timedelta(hours=24)

    # Update verification fields
    user.email_verification_token = verification_token
    user.email_verification_sent_at = datetime.utcnow()
    user.email_verification_expires_at = verification_expires_at
    user.verification_attempts = (user.verification_attempts or 0) + 1
    user.last_verification_attempt = datetime.utcnow()
    user.updated_at = datetime.utcnow()

    db.commit()

    email_sent = await email_service.send_verification_email(
        email=user.email,
        first_name=user.first_name,
        verification_token=verification_token
    )

    return {
        "message": "Verification email sent",
        "email_verification_sent": email_sent,
        "email": user.email
    }


async def verify_email(db: Session, email: str, token: str):
    """Verify email using token, and mark user as verified"""
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.is_email_verified:
        raise HTTPException(status_code=400, detail="Email already verified")
    if user.email_verification_token != token:
        raise HTTPException(status_code=400, detail="Invalid verification token")
    if user.email_verification_expires_at and user.email_verification_expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Verification token expired")

    # Mark as verified
    user.is_email_verified = True
    user.email_verification_token = None
    user.email_verification_expires_at = None
    user.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(user)

    # Send welcome email
    await email_service.send_welcome_email(user.email, user.first_name)

    return {
        "message": "Email verified successfully",
        "user": {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "is_email_verified": user.is_email_verified
        }
    }


def get_user_by_email(db: Session, email: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.email == email).first()
