from flask import jsonify, Response
from sqlalchemy import select, delete as remover, update
from sqlalchemy.exc import NoResultFound

from app.db.db import get_async_session
from app.models import Category, Expense
from app.models.planner_models import Account


async def delete_category_handler(
    category_id: int, user_id: int
) -> tuple[Response, int]:
    async with get_async_session() as session:
        async with session.begin():
            try:
                result = await session.execute(
                    select(Expense).where(
                        Expense.user_id == user_id, Expense.category_id == category_id
                    )
                )
                expenses = result.scalars().all()

                for expense in expenses:
                    await session.execute(
                        update(Account)
                        .where(Account.id == expense.account_id)
                        .values(balance=Account.balance - expense.amount)
                    )
                await session.execute(
                    remover(Expense).where(
                        Expense.user_id == user_id, Expense.category_id == category_id
                    )
                )
                # account_id_stmt = await session.execute(
                #     select(Account).filter_by(user_id=user_id)
                # )
                # account_id = account_id_stmt.all()

                # await session.execute(
                #     update(Account)
                #     .where(Account.user_id == user_id)
                #     .values(balance=Account.balance - )
                # )

                result = await session.execute(
                    select(Category).filter(
                        Category.id == category_id, Category.user_id == user_id
                    )
                )
                expense = result.scalar_one_or_none()
                if expense is None:
                    return jsonify({"message": "Category not found"}), 404

                await session.delete(expense)
                await session.commit()

            except NoResultFound:
                return jsonify({"message": "Category not found"}), 404
            return jsonify({"message": "Category deleted successfully"}), 200
