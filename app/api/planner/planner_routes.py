from flask import Blueprint, request, Response
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.api.planner.handlers.create_category import create_category_handler
from app.api.planner.handlers.create_expense_handler import create_expense_handler
from app.api.planner.handlers.delete_expense_handler import delete_expense_handler
from app.api.planner.handlers.get_all_categories_handler import (
    get_all_categories_handler,
)
from app.api.planner.handlers.get_all_expenses_handler import get_all_expenses_handler
from app.api.planner.handlers.get_category_handler import get_category_handler
from app.api.planner.handlers.get_expense_handler import get_expense_handler
from app.db.db import get_async_session
from app.schemas.category import CategoryCreate
from app.schemas.expense import ExpenseCreate

planner = Blueprint("planner", __name__)


@planner.route("/expenses", methods=["POST"])
@jwt_required()
async def create_expense():
    data = request.get_json()
    user_id = get_jwt_identity()
    expense_data = ExpenseCreate(**data)
    dep = await create_expense_handler(expense_data, user_id)

    return dep


@planner.route("/expenses/<int:expense_id>", methods=["GET"])
@jwt_required()
async def get_expense(expense_id) -> tuple[Response, int]:
    user_id = get_jwt_identity()
    dep = await get_expense_handler(expense_id, user_id)
    return dep


@planner.route("/expenses", methods=["GET"])
@jwt_required()
async def get_all_expenses() -> tuple[Response, int]:
    user_id = get_jwt_identity()  # ID пользователя из JWT токена
    dep = await get_all_expenses_handler(user_id)
    return dep


@planner.route("/expenses/<int:expense_id>", methods=["DELETE"])
@jwt_required()
async def delete_expense(expense_id) -> tuple[Response, int]:
    user_id = get_jwt_identity()
    dep = await delete_expense_handler(user_id, expense_id)
    return dep


@planner.route("/categories", methods=["POST"])
@jwt_required()
async def create_category():
    user_id = get_jwt_identity()
    data = request.get_json()
    category_data = CategoryCreate(**data)
    async with get_async_session() as session:
        return await create_category_handler(category_data, user_id, session)


@planner.route("/categories", methods=["GET"])
@jwt_required()
async def get_categories():
    user_id = get_jwt_identity()
    return await get_all_categories_handler(user_id)


@planner.route("/categories/<int:category_id>", methods=["GET"])
@jwt_required()
async def get_category(category_id: int):
    user_id = get_jwt_identity()
    return await get_category_handler(category_id, user_id)
