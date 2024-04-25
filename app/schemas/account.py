from typing import Optional

from pydantic import BaseModel


class AccountSchema(BaseModel):
    id: Optional[int] = None
    user_id: int
    balance: float
    name: str
    description: Optional[str] = None

    class Config:
        from_attributes = True


class AccountCreateSchema(BaseModel):
    name: str
    description: Optional[str] = None
