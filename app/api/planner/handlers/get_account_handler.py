from flask import jsonify, Response
from sqlalchemy import select
from sqlalchemy.exc import NoResultFound
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.planner_models import Account
from app.schemas.account import AccountSchema


async def get_accounts_handler(user_id, session: AsyncSession) -> tuple[Response, int]:
    response = await session.execute(select(Account).filter_by(user_id=user_id))
    accounts = response.scalars().all()
    return (
        jsonify([AccountSchema.from_orm(account).dict() for account in accounts]),
        200,
    )


async def get_account_handler(
    account_id: int, user_id: int, session: AsyncSession
) -> tuple[Response, int]:
    try:
        response = await session.execute(
            select(Account).where(Account.user_id == user_id, Account.id == account_id)
        )
        account = response.scalar_one()
    except NoResultFound:
        return jsonify({"message": "Not found"}), 404
    return jsonify(AccountSchema.from_orm(account).dict()), 200
