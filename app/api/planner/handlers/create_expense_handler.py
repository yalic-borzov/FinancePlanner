from datetime import datetime

import pytz
from flask import Response, jsonify
from sqlalchemy import update

from app.api.planner.handlers.check_account import check_account_exists
from app.api.planner.handlers.check_category import check_category_exists
from app.db.db import get_async_session
from app.models.planner_models import Expense, Account
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
        if not await check_account_exists(data.account_id, session):
            return (
                jsonify(
                    {"message": f"Account with ID '{data.account_id}' does not exists "}
                ),
                404,
            )
        moscow_tz = pytz.timezone("Europe/Moscow")
        date = datetime.now(moscow_tz)
        new_expense = Expense(
            user_id=user_id,
            category_id=data.category_id,
            amount=data.amount,
            description=data.description,
            date=date,
            account_id=data.account_id,
        )
        await session.execute(
            update(Account)
            .where(Account.id == data.account_id, Account.user_id == user_id)
            .values(balance=Account.balance + data.amount)
        )

        session.add(new_expense)
        await session.commit()

        await session.refresh(new_expense, attribute_names=["category", "account"])
        return jsonify(ExpenseSchema.from_orm(new_expense).dict()), 201
