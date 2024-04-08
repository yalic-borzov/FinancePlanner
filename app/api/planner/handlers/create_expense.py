from sqlalchemy.ext.asyncio import AsyncSession

from app.api.planner.handlers.check_category import check_category_exists
from app.db.db import get_async_session
from app.models.expense import Expense
from app.schemas.expense import ExpenseCreate


async def create_expense_handler(data: ExpenseCreate) -> Expense:
    async with get_async_session() as session:
        if not await check_category_exists(data.category_id, session):
            raise ValueError(f"Category with id {data.category_id} does not exist.")

        new_expense = Expense(
            category_id=data.category_id,
            amount=data.amount,
            date=data.date,
            description=data.description
        )

        session.add(new_expense)
        await session.commit()

        await session.refresh(new_expense, attribute_names=['category'])

        return new_expense
