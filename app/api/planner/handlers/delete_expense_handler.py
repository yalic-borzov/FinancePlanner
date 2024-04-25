from flask import jsonify, Response
from sqlalchemy import select, update
from sqlalchemy.exc import NoResultFound

from app.db.db import get_async_session
from app.models import Expense
from app.models.planner_models import Account


async def delete_expense_handler(user_id: str, expense_id: int) -> tuple[Response, int]:
    async with get_async_session() as session:
        async with session.begin():
            try:
                result = await session.execute(
                    select(Expense).filter(
                        Expense.id == expense_id, Expense.user_id == user_id
                    )
                )
                expense = result.scalar_one_or_none()
                if expense is None:
                    return jsonify({"message": "Expense not found"}), 404
                await session.execute(
                    update(Account)
                    .filter(
                        Account.id == expense.account_id, Account.user_id == user_id
                    )
                    .values(balance=Account.balance - expense.amount)
                )

                await session.delete(expense)
                await session.commit()

            except NoResultFound:
                return jsonify({"message": "Expense not found"}), 404
            return jsonify({"message": "Expense deleted successfully"}), 200
