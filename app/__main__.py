from datetime import timedelta

from flask import Flask
from flask_jwt_extended import JWTManager

from app.api.auth.auth_routes import auth
from app.api.planner.planner_routes import planner
from app.config import JWT_SECRET, DEBUG


def create_app() -> Flask:
    app = Flask(__name__)
    app.config["JWT_SECRET_KEY"] = JWT_SECRET
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=360)
    JWTManager(app)
    app.register_blueprint(planner, url_prefix="/api/planner")
    app.register_blueprint(auth, url_prefix="/api/auth")
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=DEBUG)
