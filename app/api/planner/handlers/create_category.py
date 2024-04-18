from flask import jsonify, Response
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.planner.handlers.check_category_by_name import check_category_by_name
from app.models.planner_models import Category
from app.schemas.category import (
    CategoryCreate,
    CategorySchema,
)  # Предполагается, что у вас есть такая схема Pydantic


async def create_category_handler(
    data: CategoryCreate, user_id, session: AsyncSession
) -> Response:
    if await check_category_by_name(data.name, session):
        return jsonify(
            {"message": f"Category with name: '{data.name}' already exists!"}
        )

    new_category = Category(name=data.name, user_id=user_id)

    session.add(new_category)
    await session.commit()
    await session.refresh(new_category)

    return jsonify(CategorySchema.from_orm(new_category).dict())
