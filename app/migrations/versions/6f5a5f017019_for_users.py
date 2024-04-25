"""for users

Revision ID: 6f5a5f017019
Revises: 9c91309d50e8
Create Date: 2024-04-25 20:22:27.672234

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6f5a5f017019'
down_revision: Union[str, None] = '9c91309d50e8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('categories', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.drop_constraint('categories_name_key', 'categories', type_='unique')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('categories_name_key', 'categories', ['name'])
    op.alter_column('categories', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###