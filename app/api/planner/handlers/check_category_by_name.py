from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.planner_models import Category


async def check_category_by_name(name: str, session: AsyncSession) -> bool:
    result = await session.execute(select(Category).filter_by(name=name))
    category_exists = result.scalars().first() is not None
    return category_exists
