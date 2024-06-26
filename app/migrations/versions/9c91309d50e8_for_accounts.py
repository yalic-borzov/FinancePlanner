"""for accounts

Revision ID: 9c91309d50e8
Revises: e1ff3e7ada0b
Create Date: 2024-04-24 15:51:26.642300

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "9c91309d50e8"
down_revision: Union[str, None] = "e1ff3e7ada0b"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("accounts", sa.Column("balance", sa.Float(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("accounts", "balance")
    # ### end Alembic commands ###
