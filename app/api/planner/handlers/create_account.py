from flask import jsonify, Response
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.planner_models import Account
from app.schemas.account import AccountCreateSchema, AccountSchema


async def create_account_handler(
    data, user_id, session: AsyncSession
) -> tuple[Response, int]:
    account_data = AccountCreateSchema(**data)

    new_account = Account(
        user_id=user_id,
        name=account_data.name,
        description=account_data.description,
        balance=0.0,
    )
    session.add(new_account)
    await session.commit()

    return jsonify(AccountSchema.from_orm(new_account).dict()), 200
