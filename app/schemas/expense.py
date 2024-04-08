from datetime import date
from typing import Optional

from pydantic import BaseModel

from app.schemas.category import CategorySchema


# Используется предыдущее определение CategorySchema


class ExpenseCreate(BaseModel):
    category_id: int
    amount: float
    date: date
    description: Optional[str] = None


class ExpenseSchema(BaseModel):
    id: int
    category_id: int
    amount: float
    date: date
    description: Optional[str] = None
    category: Optional[CategorySchema] = None

    class Config:
        from_attributes = True
