from typing import List

from sqlalchemy.orm import Mapped, mapped_column

from app.db.db import Base  # Убедись, что этот импорт корректен


class Category(Base):
    __tablename__ = 'categories'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(unique=True, nullable=False)
