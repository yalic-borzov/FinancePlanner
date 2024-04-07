from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.db import Base  # Убедись, что этот импорт корректен
from typing import Optional
from datetime import date

from app.models.category import Category


class Expense(Base):
    __tablename__ = 'expenses'

    id: Mapped[int] = mapped_column(primary_key=True)
    category_id: Mapped[int] = mapped_column(ForeignKey('categories.id'), nullable=False)
    amount: Mapped[float] = mapped_column(nullable=False)
    date: Mapped[date]
    description: Mapped[Optional[str]] = mapped_column(nullable=True)

    # Определение отношения для доступа к объекту категории из объекта расхода
    category: Mapped["Category"] = relationship("Category", back_populates="expenses")
