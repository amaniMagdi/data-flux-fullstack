import os
from flask import Flask
from .config import DevelopmentConfig
from .extensions import db, migrate, cors
from .routes.tabular import tabular_bp
from .routes.images import images_bp
"""from .routes.text import text_bp"""

def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'static', 'media')

    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)

    app.register_blueprint(tabular_bp, url_prefix='/tabular')
    app.register_blueprint(images_bp, url_prefix='/images')
    """app.register_blueprint(text_bp)"""

    return app
