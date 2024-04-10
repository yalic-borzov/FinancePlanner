from flask import Blueprint, request, Response

from app.api.auth.handlers.login_handler import login_handler
from app.api.auth.handlers.register_handler import register_handler

auth = Blueprint("auth", __name__)


@auth.route("login", methods=["POST"])
async def login() -> Response:
    return await login_handler(request)


@auth.route("register", methods=["POST"])
async def register() -> Response:
    return await register_handler(request)
