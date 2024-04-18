from flask import jsonify, Response
from sqlalchemy import select

from app.db.db import get_async_session
from app.models import Category
from app.schemas.category import CategorySchema


async def get_all_categories_handler(user_id: int) -> tuple[Response, int]:
    async with get_async_session() as session:
        result = await session.execute(
            select(Category).where(Category.user_id == user_id)
        )
        expenses = result.scalars().all()

    expenses_data = [CategorySchema.from_orm(expense).dict() for expense in expenses]
    return jsonify(expenses_data), 200
