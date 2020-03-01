'''Use this for development'''
import dj_database_url
from .base import *

ALLOWED_HOSTS += ['py3-test-app.herokuapp.com', '127.0.0.1'] 
DEBUG = True

WSGI_APPLICATION = 'home.wsgi.dev.application'

# DATABASES = {
#         'default': {
#             'ENGINE': 'django.db.backends.sqlite3',
#             'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#         }
#     }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': "postgres",
        'USER': "postgres",
        'PASSWORD': "gallo",
        'HOST': 'localhost',
        'PORT': '',
    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': "dfc4v1bda2ca87",
#         'USER': "metoonltzqhbhl",
#         'PASSWORD': "d665310c6625fbda13a1adf8e5a52394976ba9e40f069de57f4db8b72f3d3f08",
#         'HOST': 'ec2-3-231-46-238.compute-1.amazonaws.com',
#         'PORT': '5432',
#     }
# }

db_from_env = dj_database_url.config(conn_max_age=500, ssl_require=True)
DATABASES['default'].update(db_from_env)

CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
    "http://localhost:8001",
    "http://localhost:8000",
    "http://localhost:5432",
)

# in_heroku = False
# if 'DATABASE_URL' in os.environ:
#     in_heroku = True

# if in_heroku:
#     print("HEROKU DB")
#     db_from_env = dj_database_url.config(conn_max_age=500, ssl_require=True)
#     DATABASES['default'].update(db_from_env)
#     DATABASES = {'default': dj_database_url.config()}
# else:
#     print("SQLITE3 DB")
#     DATABASES = {
#         'default': {
#             'ENGINE': 'django.db.backends.sqlite3',
#             'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#         }
#     }