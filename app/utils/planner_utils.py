from datetime import datetime, timedelta

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Expense


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
    user_id, start_date, end_date, session: AsyncSession
):
    result = await session.execute(
        select(Expense)
        .where(
            Expense.user_id == user_id,
            Expense.date >= start_date,
            Expense.date <= end_date,
        )
        .order_by(Expense.date)
    )
    expenses = result.scalars().all()

    # Подсчёт статистики

    total_amount = sum(expense.amount for expense in expenses)
    stats = {
        "total_amount": total_amount,
        "total_count": len(expenses),
        "average_expense": total_amount / len(expenses) if expenses else 0,
    }
    return stats
