"""for personal user

Revision ID: e029d5553083
Revises: 39ebea04b7c6
Create Date: 2024-04-10 18:09:38.617022

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "e029d5553083"
down_revision: Union[str, None] = "39ebea04b7c6"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("categories", sa.Column("user_id", sa.Integer(), nullable=True))
    op.create_foreign_key(None, "categories", "users", ["user_id"], ["id"])
    op.add_column("expenses", sa.Column("user_id", sa.Integer(), nullable=True))
    op.create_foreign_key(None, "expenses", "users", ["user_id"], ["id"])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, "expenses", type_="foreignkey")
    op.drop_column("expenses", "user_id")
    op.drop_constraint(None, "categories", type_="foreignkey")
    op.drop_column("categories", "user_id")
    # ### end Alembic commands ###
