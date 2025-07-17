from fastapi import FastAPI
from apps.backend.app.db import database, models
from apps.backend.app.routes import users

app = FastAPI()

# create_db.initialize()
models.Base.metadata.create_all(bind=database.engine)

app.include_router(users.router)


