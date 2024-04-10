from flask import jsonify, Response, Request
from flask_jwt_extended import create_access_token
from sqlalchemy import select

from app.db.db import get_async_session
from app.models.user import User
from app.schemas.user import UserLogin


async def login_handler(data: Request) -> Response | tuple[Response, int]:
    try:
        login_data = UserLogin(**data.get_json())
    except ValueError as e:
        return jsonify({"message": str(e)})

    async with get_async_session() as session:
        async with session.begin():
            query = select(User).filter_by(username=login_data.username)
            result = await session.execute(query)
            user = result.scalars().first()

            if user is None or not user.check_password(login_data.password):
                return jsonify({"message": "Invalid username or password"}), 401

            access_token = create_access_token(identity=user.username)
            return jsonify(access_token=access_token), 200
