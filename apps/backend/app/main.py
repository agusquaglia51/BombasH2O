from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .db import database, models
from .routes import users
from dotenv import load_dotenv

load_dotenv()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# create_db.initialize()
models.Base.metadata.create_all(bind=database.engine)

app.include_router(users.router)


