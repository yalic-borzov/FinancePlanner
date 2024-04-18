from flask import jsonify, Response
from sqlalchemy import select
from sqlalchemy.exc import NoResultFound

from app.db.db import get_async_session
from app.models import Category
from app.schemas.category import CategorySchema


async def get_category_handler(category_id: int, user_id: int) -> tuple[Response, int]:
    async with get_async_session() as session:
        try:
            result = await session.execute(
                select(Category).where(
                    Category.user_id == user_id, Category.id == category_id
                )
            )
            category = result.scalar_one()
        except NoResultFound:
            return jsonify({"message": "Category not found!"}), 404

        return jsonify(CategorySchema.from_orm(category).dict()), 200
