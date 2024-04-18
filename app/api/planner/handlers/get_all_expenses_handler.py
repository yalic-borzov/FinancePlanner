from flask import jsonify, Response
from sqlalchemy import select

from app.db.db import get_async_session
from app.models import Expense
from app.schemas.expense import ExpenseSchema


async def get_all_expenses_handler(user_id: int) -> tuple[Response, int]:
    async with get_async_session() as session:
        # Выбираем все траты для текущего пользователя
        result = await session.execute(
            select(Expense)
            .where(Expense.user_id == user_id)
            .order_by(Expense.date.desc())
        )
        expenses = result.scalars().all()

    # Сериализация данных через Pydantic
    expenses_data = [ExpenseSchema.from_orm(expense).dict() for expense in expenses]
    return jsonify(expenses_data), 200
