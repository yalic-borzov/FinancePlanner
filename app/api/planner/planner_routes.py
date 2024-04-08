from flask import Blueprint, request, jsonify
from sqlalchemy import select
from sqlalchemy.exc import NoResultFound

from app.api.planner.handlers.create_category import create_category_handler
from app.api.planner.handlers.create_expense import create_expense_handler
from app.db.db import get_async_session
from app.models.expense import Expense
from app.schemas.category import CategoryCreate, CategorySchema
from app.schemas.expense import ExpenseCreate, ExpenseSchema

planner = Blueprint("planner", __name__)


@planner.route("/expenses", methods=["POST"])
async def create_expense():
    data = request.get_json()
    expense_data = ExpenseCreate(**data)
    dep = await create_expense_handler(expense_data)

    return jsonify(ExpenseSchema.from_orm(dep).dict())


@planner.route("/expenses/<int:expense_id>", methods=["GET"])
async def get_expense(expense_id):
    async with get_async_session() as session:
        async with session.begin():
            try:
                result = await session.execute(
                    select(Expense).filter(Expense.id == expense_id)
                )
                expense = result.scalar_one()
            except NoResultFound:
                return jsonify({"message": "Expense not found"}), 404

            return jsonify(ExpenseSchema.from_orm(expense).dict())


@planner.route("/expenses/<int:expense_id>", methods=["DELETE"])
async def delete_expense(expense_id):
    async with get_async_session() as session:
        async with session.begin():
            try:
                result = await session.execute(
                    select(Expense).filter(Expense.id == expense_id)
                )
                expense = result.scalar_one_or_none()
                if expense is None:
                    return jsonify({"message": "Expense not found"}), 404

                await session.delete(expense)
                await session.commit()

            except NoResultFound:
                return jsonify({"message": "Expense not found"}), 404
            return jsonify({"message": "Expense deleted successfully"}), 200


@planner.route("/categories", methods=["POST"])
async def create_category():
    data = request.get_json()
    category_data = CategoryCreate(**data)
    return await create_category_handler(category_data)

