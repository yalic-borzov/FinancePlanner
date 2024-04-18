from flask import Response, jsonify

from app.api.planner.handlers.check_category import check_category_exists
from app.db.db import get_async_session
from app.models.planner_models import Expense
from app.schemas.expense import ExpenseCreate, ExpenseSchema


async def create_expense_handler(data: ExpenseCreate, user_id) -> tuple[Response, int]:
    async with get_async_session() as session:
        if not await check_category_exists(data.category_id, session):
            return (
                jsonify(
                    {"message": f"Category with ID '{data.category_id}' does not exist"}
                ),
                404,
            )
        new_expense = Expense(
            user_id=user_id,
            category_id=data.category_id,
            amount=data.amount,
            date=data.date,
            description=data.description,
        )

        session.add(new_expense)
        await session.commit()

        await session.refresh(new_expense, attribute_names=["category"])
        return jsonify(ExpenseSchema.from_orm(new_expense).dict()), 201
