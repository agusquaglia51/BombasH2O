from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from app.db import database
from ..schemas.user import UserRegister
from app.services import user_service

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/auth/signup", status_code=status.HTTP_201_CREATED)
async def create_user(payload: UserRegister):
    """
    Create a new user and send verification email.
    Returns minimal user info without sensitive fields.
    """
    try:
        print(f"Received user registration payload: {payload}")
        with database.get_db() as session:
            user = await user_service.create_user(session, payload)

            return JSONResponse(
                status_code=status.HTTP_201_CREATED,
                content={
                    "message": "User created successfully",
                    "user": user
                },
                headers={"Location": f"/users/{user['id']}"}
            )

    except HTTPException:
        # Re-lanzar HTTP exceptions tal cual
        raise

    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    except Exception as e:
        print(f"Unexpected error during user creation: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )


@router.get("/verify-email")
async def verify_email(email: str, token: str):
    """
    Endpoint to verify a user's email using the token sent in email.
    Marks the user as verified and sends welcome email.
    """
    try:
        with database.get_db() as session:
            result = await user_service.verify_email(session, email, token)
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content=result
            )
    except HTTPException:
        raise
    except Exception as e:
        print(f"Unexpected error during email verification: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )
