import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from contextlib import contextmanager

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "")

print(f"DATABASE_URL: {DATABASE_URL!r}")

# Crea el motor
engine = create_engine(DATABASE_URL, echo=True)

# Crea la sesion
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para modelos ORM
Base = declarative_base()

@contextmanager
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()