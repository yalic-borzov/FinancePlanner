from flask import request

from app.api.planner.handlers.create_category import create_category_handler
from app.api.planner.planner_routes import planner
from app.schemas.category import CategoryCreate


@planner.route("/categories", methods=["POST"])
async def create_category():
    data = request.get_json()
    category_data = CategoryCreate(**data)
    return await create_category_handler(category_data)
