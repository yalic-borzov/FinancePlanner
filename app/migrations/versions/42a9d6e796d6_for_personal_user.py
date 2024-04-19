"""for personal user

Revision ID: 42a9d6e796d6
Revises: e0cf7ba1e3f0
Create Date: 2024-04-19 17:11:11.178529

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "42a9d6e796d6"
down_revision: Union[str, None] = "e0cf7ba1e3f0"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        "expenses",
        "date",
        existing_type=sa.DATE(),
        type_=sa.DateTime(timezone=True),
        existing_nullable=False,
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        "expenses",
        "date",
        existing_type=sa.DateTime(timezone=True),
        type_=sa.DATE(),
        existing_nullable=False,
    )
    # ### end Alembic commands ###
