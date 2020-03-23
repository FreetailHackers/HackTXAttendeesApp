from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from application.setup import init_db

db = SQLAlchemy()

def create_app():
    app = Flask(__name__, instance_relative_config=False);
    app.config.from_object('config.Config')
    db.init_app(app)


    with app.app_context():
        from . import routes
        init_db()
        db.create_all()
        return app