from flask import jsonify, Response
from sqlalchemy import select
from sqlalchemy.exc import NoResultFound

from app.db.db import get_async_session
from app.models import Expense
from app.schemas.expense import ExpenseSchema


async def get_expense_handler(expense_id: int, user_id: str) -> tuple[Response, int]:
    async with get_async_session() as session:
        async with session.begin():
            try:
                result = await session.execute(
                    select(Expense).filter(
                        Expense.id == expense_id, Expense.user_id == user_id
                    )
                )
                expense = result.scalar_one()
            except NoResultFound:
                return jsonify({"message": "Expense not found"}), 404

            return jsonify(ExpenseSchema.from_orm(expense).dict()), 200
