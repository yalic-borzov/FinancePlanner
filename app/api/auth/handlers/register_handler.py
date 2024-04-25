from flask import jsonify, Request
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User
from app.schemas.user import UserCreate  # Импорт схемы Pydantic
from app.utils.planner_utils import create_base_categories, create_base_account


async def register_handler(data: Request, session: AsyncSession):
    try:
        user_data = UserCreate(**data.get_json())
    except ValueError as e:
        return jsonify({"message": str(e)}), 400

    existing_user = await session.execute(
        select(User).filter_by(username=user_data.username)
    )
    if existing_user.scalars().first() is not None:
        return jsonify({"message": "Username already taken"}), 400

    new_user = User(username=user_data.username)
    new_user.set_password(user_data.password)

    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)
    await create_base_categories(session, user_id=new_user.id)
    await create_base_account(session, user_id=new_user.id)

    return jsonify({"message": "User created successfully"}), 201
