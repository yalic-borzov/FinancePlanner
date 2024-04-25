from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from app.schemas.account import AccountSchema
from app.schemas.category import CategorySchema


class ExpenseCreate(BaseModel):
    category_id: int
    amount: float
    account_id: int
    description: Optional[str] = None


class ExpenseSchema(BaseModel):
    id: int
    category_id: int
    amount: float
    date: datetime
    description: Optional[str] = None
    account: Optional[AccountSchema] = None
    account_id: int
    category: Optional[CategorySchema] = None

    class Config:
        from_attributes = True
