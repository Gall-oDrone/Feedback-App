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
        'NAME': "dcfjqp7rov0d7s",
        'USER': "mevrsyqlgxhpws",
        'PASSWORD': "4bc8dddb4bfbcc487b8fc027cab3520a90822cd6b63b1c0a2f8d71f338062349",
        'HOST': 'ec2-34-235-108-68.compute-1.amazonaws.com',
        'PORT': '5432',
    }
}

db_from_env = dj_database_url.config(conn_max_age=500)
DATABASES['default'].update(db_from_env)

CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
    "http://localhost:8001",
)

#Corso
in_heroku = False
if 'DATABASE_URL' in os.environ:
    in_heroku = True

# import dj_database_url
if in_heroku:
    DATABASES = {'default': dj_database_url.config()}
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }