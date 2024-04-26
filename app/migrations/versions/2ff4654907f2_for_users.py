"""for users

Revision ID: 2ff4654907f2
Revises: 6f5a5f017019
Create Date: 2024-04-26 09:05:15.168440

"""

from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = "2ff4654907f2"
down_revision: Union[str, None] = "6f5a5f017019"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint("accounts_name_key", "accounts", type_="unique")
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint("accounts_name_key", "accounts", ["name"])
    # ### end Alembic commands ###