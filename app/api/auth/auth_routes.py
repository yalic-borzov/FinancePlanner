from flask import Blueprint, request, Response, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import select

from app.api.auth.handlers.login_handler import login_handler
from app.api.auth.handlers.register_handler import register_handler
from app.db.db import get_async_session
from app.models import User

auth = Blueprint("auth", __name__)


@auth.route("/login", methods=["POST"])
async def login() -> Response:
    async with get_async_session() as session:
        dep = await login_handler(request, session)
        return dep


@auth.route("/register", methods=["POST"])
async def register() -> Response:
    async with get_async_session() as session:
        dep = await register_handler(request, session)
        return dep


@auth.route("/user", methods=["GET"])
@jwt_required()
async def get_user_info() -> tuple[Response, int]:
    user_id = get_jwt_identity()  # Получаем ID пользователя из JWT токена

    async with get_async_session() as session:
        # Используем сессию для получения имени пользователя по ID
        async with session.begin():
            result = await session.execute(
                select(User.username).where(User.id == user_id)
            )
            username = result.scalars().first()

    if username is None:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"username": username}), 200
