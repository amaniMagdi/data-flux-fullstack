import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'mysql://trusted_user:trust1469@localhost/data_flux')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    #it's better to set SECRET_KEY as environment variable
    SECRET_KEY = os.environ.get('SECRET_KEY', 'b28c8ff9991f5a6c7f22b9f9fb1b0891b1e5d986daf20b8194a24178fb54715f') # Fallback key for development

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False
