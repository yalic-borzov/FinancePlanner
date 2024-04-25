from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.planner_models import Account


async def check_account_exists(account_id: int, session: AsyncSession) -> bool:
    result = await session.execute(select(Account).filter_by(id=account_id))
    return result.scalars().first() is not None
