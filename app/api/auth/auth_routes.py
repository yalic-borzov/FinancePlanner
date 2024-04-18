from flask import Blueprint, request, Response

from app.api.auth.handlers.login_handler import login_handler
from app.api.auth.handlers.register_handler import register_handler
from app.db.db import get_async_session

auth = Blueprint("auth", __name__)


@auth.route("login", methods=["POST"])
async def login() -> Response:
    async with get_async_session() as session:
        dep = await login_handler(request, session)
        return dep


@auth.route("register", methods=["POST"])
async def register() -> Response:
    async with get_async_session() as session:
        dep = await register_handler(request, session)
        return dep
