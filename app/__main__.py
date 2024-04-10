from flask import Flask
from flask_jwt_extended import JWTManager

from app.api.auth.auth_routes import auth
from app.api.planner.planner_routes import planner


def create_app() -> Flask:
    app = Flask(__name__)
    app.config["JWT_SECRET_KEY"] = (
        "rzsVsacj4FPu3LPXfJQvGCYgwHZKmkkBjHM4x6AGcdoX55jvMQyXQG7zjFHeVsU8c7Gxs4XHKYLGQfmjde7oNTKjptUAZb2uET3oPqjQqiFLat5VA8bYE7CCFsndPPBW"
    )
    jwt = JWTManager(app)
    app.register_blueprint(planner, url_prefix="/api/planner")
    app.register_blueprint(auth, url_prefix="/api/auth")
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
