import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from contextlib import contextmanager
import psycopg2
from psycopg2 import sql

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "")
print(f"DATABASE_URL: {DATABASE_URL!r}")

# Parseamos la URL para obtener info de conexión
import urllib.parse as up
url = up.urlparse(DATABASE_URL)
db_name = url.path[1:]  # eliminamos el "/"
db_user = url.username
db_password = url.password
db_host = url.hostname
db_port = url.port or 5432

# Intentamos conectarnos a la base de datos postgres para crear la DB si no existe
try:
    conn = psycopg2.connect(
        dbname="postgres",
        user=db_user,
        password=db_password,
        host=db_host,
        port=db_port,
    )
    conn.autocommit = True
    cur = conn.cursor()
    cur.execute(sql.SQL("SELECT 1 FROM pg_database WHERE datname = %s"), [db_name])
    exists = cur.fetchone()
    if not exists:
        print(f"Base de datos '{db_name}' no existe, creando...")
        cur.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(db_name)))
    cur.close()
    conn.close()
except Exception as e:
    print("Error al crear la base de datos:", e)

# Crea el motor
engine = create_engine(DATABASE_URL, echo=True)

# Crea la sesion
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para modelos ORM
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
