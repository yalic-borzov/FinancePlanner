import os

from dotenv import load_dotenv

load_dotenv()

DATABASE_STRING = os.getenv("DATABASE_STRING")
ALEMBIC_DATABASE_STRING = os.getenv("ALEMBIC_DATABASE_STRING")
JWT_SECRET = os.getenv("JWT_SECRET")
