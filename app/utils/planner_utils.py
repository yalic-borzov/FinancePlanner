from datetime import datetime, timedelta

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Expense, Category


def calculate_date_range(period):
    today = datetime.today()
    if period == "week":
        start_date = today - timedelta(days=today.weekday())
        end_date = start_date + timedelta(days=7)
    elif period == "month":
        start_date = today.replace(day=1)
        next_month = today.replace(day=28) + timedelta(days=4)
        end_date = next_month - timedelta(days=next_month.day)
    else:
        # Возвращаем текущий месяц по умолчанию
        start_date = today.replace(day=1)
        next_month = today.replace(day=28) + timedelta(days=4)
        end_date = next_month - timedelta(days=next_month.day)

    return start_date, end_date


async def calculate_expenses_stats(
    user_id, start_date, end_date, session: AsyncSession, top_limit=3
):
    # Запрос для получения суммы расходов по каждой категории, сортировка по убыванию
    result = await session.execute(
        select(Expense.category_id, func.sum(Expense.amount).label("total_amount"))
        .where(
            Expense.user_id == user_id,
            Expense.date >= start_date,
            Expense.date <= end_date,
        )
        .group_by(Expense.category_id)
        .order_by(func.sum(Expense.amount).desc())
        .limit(top_limit)  # Ограничение количества категорий
    )
    expenses_by_category = result.all()

    if not expenses_by_category:
        return {"message": "No expenses found for the given period"}

    # Сбор информации о топ категориях
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
