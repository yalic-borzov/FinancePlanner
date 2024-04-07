from flask import Blueprint, request, jsonify
from sqlalchemy import select
from sqlalchemy.exc import NoResultFound

from app.db.db import get_async_session
from app.models.expense import Expense
from app.schemas.expense import ExpenseCreate, ExpenseSchema

planner = Blueprint('planner', __name__)


@planner.route('/expenses', methods=['POST'])
async def create_expense():
    data = request.get_json()
    expense_data = ExpenseCreate(**data)
    async with get_async_session() as session:
        new_expense = Expense(**expense_data.dict(exclude_unset=True))
        session.add(new_expense)
        await session.commit()
        await session.refresh(new_expense)
        return jsonify(ExpenseSchema.from_orm(new_expense).dict()), 201


@planner.route('/expenses/<int:expense_id>', methods=['GET'])
async def get_expense(expense_id):
    async with get_async_session() as session:
        async with session.begin():
            try:
                result = await session.execute(select(Expense).filter(Expense.id == expense_id))
                expense = result.scalar_one()
            except NoResultFound:
                return jsonify({'message': 'Expense not found'}), 404

            return jsonify(ExpenseSchema.from_orm(expense).dict())


@planner.route('/expenses/<int:expense_id>', methods=['DELETE'])
async def delete_expense(expense_id):
    async with get_async_session() as session:
        async with session.begin():
            try:
                result = await session.execute(select(Expense).filter(Expense.id == expense_id))
                expense = result.scalar_one_or_none()
                if expense is None:
                    return jsonify({'message': 'Expense not found'}), 404

                await session.delete(expense)
                await session.commit()

            except NoResultFound:
                return jsonify({'message': 'Expense not found'}), 404
            return jsonify({'message': 'Expense deleted successfully'}), 200
