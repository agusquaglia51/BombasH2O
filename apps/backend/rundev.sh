#!/bin/bash

# Activar el entorno virtual
source .venv/bin/activate

# Iniciar el servidor de FastAPI
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Al cerrar uvicorn, desactivar el entorno
deactivate
