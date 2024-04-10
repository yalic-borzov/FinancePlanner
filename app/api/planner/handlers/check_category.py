from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.category import Category


async def check_category_exists(category_id: int, session: AsyncSession) -> bool:
    result = await session.execute(select(Category).filter_by(id=category_id))
    return result.scalars().first() is not None
