from flask import Blueprint, request, Response, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.api.planner.handlers.create_account import create_account_handler
from app.api.planner.handlers.create_category import create_category_handler
from app.api.planner.handlers.create_expense_handler import create_expense_handler
from app.api.planner.handlers.delete_category_handler import delete_category_handler
from app.api.planner.handlers.delete_expense_handler import delete_expense_handler
from app.api.planner.handlers.get_account_handler import (
    get_accounts_handler,
    get_account_handler,
)
from app.api.planner.handlers.get_all_categories_handler import (
    get_all_categories_handler,
)
from app.api.planner.handlers.get_all_expenses_handler import get_all_expenses_handler
from app.api.planner.handlers.get_category_handler import get_category_handler
from app.api.planner.handlers.get_expense_handler import get_expense_handler
from app.db.db import get_async_session
from app.schemas.category import CategoryCreate
from app.schemas.expense import ExpenseCreate
from app.utils.planner_utils import calculate_date_range, calculate_expenses_stats

planner = Blueprint("planner", __name__)


@planner.route("/expenses", methods=["POST"])
@jwt_required()
async def create_expense() -> tuple[Response, int]:
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
    user_id = get_jwt_identity()
    account_id = request.args.get("account_id")
    if account_id is None:
        dep = await get_all_expenses_handler(user_id)
    else:
        dep = await get_all_expenses_handler(user_id, int(account_id))
    return dep


@planner.route("/expenses/<int:expense_id>", methods=["DELETE"])
@jwt_required()
async def delete_expense(expense_id) -> tuple[Response, int]:
    user_id = get_jwt_identity()
    dep = await delete_expense_handler(user_id, expense_id)
    return dep


@planner.route("/expenses/stats", methods=["GET"])
@jwt_required()
async def get_expenses_stats():
    user_id = get_jwt_identity()
    period = request.args.get("period", "month")  # 'month', 'week' или custom dates
    account_id = request.args.get("account_id")
    start_date, end_date = calculate_date_range(period)
    async with get_async_session() as session:
        stats = await calculate_expenses_stats(
            user_id, start_date, end_date, session, account_id
        )
    return jsonify(stats), 200


@planner.route("/categories", methods=["POST"])
@jwt_required()
async def create_category() -> tuple[Response, int]:
    user_id = get_jwt_identity()
    data = request.get_json()
    category_data = CategoryCreate(**data)
    async with get_async_session() as session:
        return await create_category_handler(category_data, user_id, session)


@planner.route("/categories", methods=["GET"])
@jwt_required()
async def get_categories() -> tuple[Response, int]:
    user_id = get_jwt_identity()
    return await get_all_categories_handler(user_id)


@planner.route("/categories/<int:category_id>", methods=["GET"])
@jwt_required()
async def get_category(category_id: int) -> tuple[Response, int]:
    user_id = get_jwt_identity()
    return await get_category_handler(category_id, user_id)


@planner.route("/categories/<int:category_id>", methods=["DELETE"])
@jwt_required()
async def delete_category(category_id: int) -> tuple[Response, int]:
    user_id = get_jwt_identity()
    return await delete_category_handler(category_id, user_id)


@planner.route("/accounts", methods=["POST"])
@jwt_required()
async def create_account() -> tuple[Response, int]:
    """Создание счета"""
    user_id = get_jwt_identity()
    data = request.get_json()
    async with get_async_session() as session:
        res = await create_account_handler(data, user_id, session)
    return res


@planner.route("/accounts", methods=["GET"])
@jwt_required()
async def get_accounts():
    """Получение счета"""
    user_id = get_jwt_identity()

    async with get_async_session() as session:
        return await get_accounts_handler(user_id=user_id, session=session)


@planner.route("/accounts/<int:account_id>", methods=["GET"])
@jwt_required()
async def get_account(account_id: int):
    user_id = get_jwt_identity()

    async with get_async_session() as session:
        return await get_account_handler(account_id, user_id, session)
