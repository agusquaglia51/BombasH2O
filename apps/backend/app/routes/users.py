from datetime import timedelta
from typing import Optional
from fastapi import APIRouter, Cookie, HTTPException, Query, Response, status, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from app.services import user_service
from app.db.database import get_db

from ..services import auth_service
from ..schemas.user import LoginResponse, LoginUserRequest, UserRegister, UserVerificationResponse


router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/auth/signup", status_code=status.HTTP_201_CREATED)
async def create_user(payload: UserRegister, db: Session = Depends(get_db)):
    """
    Create a new user and send verification email.
    Returns minimal user info without sensitive fields.
    """
    
    user = await user_service.create_user(db, payload)
    
    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content={
            "message": "User created successfully",
            "user": user
        },
        headers={"Location": f"/users/{user['id']}"}
    )


@router.get(
    "/auth/verify-email",
    response_model=UserVerificationResponse,
    status_code=status.HTTP_200_OK
)
async def verify_email(
    email: str = Query(..., description="User email"),
    token: str = Query(..., description="Verification token"),
    db: Session = Depends(get_db)
):
    """
    Verify a user's email using the token sent in email.
    Marks the user as verified and sends welcome email.
    """
    return await user_service.verify_email(db, email, token)


@router.post(
    "/auth/login",
    response_model=LoginResponse,
    status_code=status.HTTP_200_OK
)
async def login(data: LoginUserRequest, response: Response, db: Session = Depends(get_db)):
    user = auth_service.authenticate_user(db, data.email, data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = auth_service.create_access_token(
        data={"sub": user.email},
        expires_delta=timedelta(minutes=auth_service.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,  # True en producción con HTTPS
        samesite="lax",
        path="/"
    )

    return {
        "message": "Login successful",
        "user": {"email": user.email, "first_name": user.first_name}
    }
    

@router.get("/auth/me", response_model=LoginResponse)
def get_current_user(
    access_token: Optional[str] = Cookie(None),
    db: Session = Depends(get_db)
):
    """
    Devuelve el usuario actual a partir del access_token en cookies.
    """
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    user = auth_service.get_user_by_token(db, access_token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    return {
        "message": "User authenticated",
        "user": {"email": user.email, "first_name": user.first_name}
    }