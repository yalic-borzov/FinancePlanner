from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime
from sqlalchemy import ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.db import Base
from app.models.user import User


class Expense(Base):
    __tablename__ = "expenses"

    id: Mapped[int] = mapped_column(primary_key=True)
    category_id: Mapped[int] = mapped_column(
        ForeignKey("categories.id"), nullable=False
    )
    amount: Mapped[float] = mapped_column(nullable=False)
    date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
    description: Mapped[Optional[str]] = mapped_column(nullable=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=True)
    account_id: Mapped[int] = mapped_column(ForeignKey("accounts.id"), nullable=True)
    user = relationship("User", back_populates="expenses")
    category = relationship("Category", back_populates="expenses")
    account = relationship("Account", back_populates="expenses")


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(unique=True, nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=True)
    user: Mapped[User] = relationship("User", back_populates="categories")
    expenses: Mapped[Expense] = relationship("Expense", back_populates="category")


class Account(Base):
    __tablename__ = "accounts"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(unique=True, nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=True)
    user: Mapped[User] = relationship("User", back_populates="accounts")
    balance: Mapped[float] = mapped_column(nullable=True)
    description: Mapped[str] = mapped_column(nullable=True)
    expenses: Mapped[Expense] = relationship("Expense", back_populates="account")
