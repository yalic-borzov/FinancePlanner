from typing import Optional

from flask import jsonify, Response
from sqlalchemy import select, desc
from sqlalchemy.orm import joinedload

from app.db.db import get_async_session
from app.models import Expense
from app.schemas.expense import ExpenseSchema


async def get_all_expenses_handler(
    user_id: int, account_id: Optional[int] = None
) -> tuple[Response, int]:
    async with get_async_session() as session:
        if not account_id:
            result = await session.execute(
                select(Expense)
                .options(joinedload(Expense.category), joinedload(Expense.account))
                .where(Expense.user_id == user_id)
                .order_by(desc(Expense.date))
            )
        else:
            result = await session.execute(
                select(Expense)
                .options(joinedload(Expense.category), joinedload(Expense.account))
                .where(Expense.user_id == user_id, Expense.account_id == account_id)
                .order_by(desc(Expense.date))
            )
        expenses = result.scalars().all()

    expenses_data = [ExpenseSchema.from_orm(expense).dict() for expense in expenses]
    return jsonify(expenses_data), 200
