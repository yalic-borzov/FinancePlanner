from flask import Flask

from app.api.planner.planner_routes import planner


def create_app() -> Flask:
    app = Flask(__name__)
    app.register_blueprint(planner, url_prefix="/api")
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
