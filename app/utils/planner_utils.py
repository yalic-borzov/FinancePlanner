from datetime import datetime, timedelta, time

import pytz
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Expense, Category
from app.models.planner_models import Account


def calculate_date_range(period):
    now = datetime.now(pytz.utc)
    today = now.date()
    if period == "week":
        start_date = (
            datetime.combine(today, time.min) - timedelta(days=today.weekday())
        ).replace(tzinfo=pytz.utc)
        end_date = (start_date + timedelta(days=6, seconds=86399)).replace(
            tzinfo=pytz.utc
        )
    elif period == "month":
        start_date = datetime.combine(today.replace(day=1), time.min).replace(
            tzinfo=pytz.utc
        )
        end_date = (start_date + timedelta(days=32)).replace(
            day=1, tzinfo=pytz.utc
        ) - timedelta(seconds=1)
    else:
        start_date = datetime.combine(today.replace(day=1), time.min).replace(
            tzinfo=pytz.utc
        )
        end_date = (start_date + timedelta(days=32)).replace(
            day=1, tzinfo=pytz.utc
        ) - timedelta(seconds=1)

    return start_date, end_date


async def calculate_expenses_stats(
    user_id: int, start_date, end_date, session: AsyncSession, account_id: int = None
):
    # Добавление условия для фильтрации по account_id, если оно предоставлено
    query = select(
        Expense.category_id, func.sum(Expense.amount).label("total_amount")
    ).where(
        Expense.user_id == user_id,
        Expense.date >= start_date,
        Expense.date <= end_date,
    )
    if account_id:
        query = query.where(Expense.account_id == int(account_id))

    query = query.group_by(Expense.category_id).order_by(
        func.sum(Expense.amount).desc()
    )

    result = await session.execute(query)
    expenses_by_category = result.all()

    if not expenses_by_category:
        return {"message": "No expenses found for the given period"}

    # Сбор информации о категориях
    categories_info = []
    for category_id, amount in expenses_by_category:
        category_name = await get_category_name(category_id, session)
        categories_info.append(
            {
                "category_id": category_id,
                "category_name": category_name,
                "amount": amount,
            }
        )

    total_amount = sum(item["amount"] for item in categories_info)
    total_count = len(expenses_by_category)

    return {
        "total_amount": total_amount,
        "total_count": total_count,
        "top_categories": categories_info,
    }


async def get_category_name(category_id: int, session: AsyncSession):
    result = await session.execute(
        select(Category.name).where(Category.id == category_id)
    )
    category_name = result.scalar()

    return category_name


async def create_base_categories(session: AsyncSession, user_id: int):
    categories = ["Дом", "Машина", "Продукты", "Фастфуд", "Аптека", "Переводы", "Такси"]
    for i in categories:
        print("Create: ", i)
        category = Category(name=i, user_id=user_id)
        session.add(category)

    await session.commit()
    return True


async def create_base_account(session: AsyncSession, user_id):
    new_account = Account(
        user_id=user_id,
        name="Основной",
        description="Основной счет",
        balance=0.0,
    )
    session.add(new_account)
    await session.commit()
    return True
