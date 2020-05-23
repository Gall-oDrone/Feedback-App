'''Use this for development'''
import dj_database_url
from .base import *

ALLOWED_HOSTS += ['py3-test-app.herokuapp.com', '127.0.0.1'] 
DEBUG = True

WSGI_APPLICATION = 'home.wsgi.dev.application'
ASGI_APPLICATION = "home.asgi.routing.application"
# DATABASES = {
#         'default': {
#             'ENGINE': 'django.db.backends.sqlite3',
#             'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#         }
#     }

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
        },
    },
}

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

H_DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': "d2f0i5ch7mim3a",
        'USER': "fprocgmtgzampz",
        'PASSWORD': "1309fcda6332a3961b01fb8a47ba69f0138d0fecb60b43b1b46edac18e175f5a",
        'HOST': 'ec2-54-210-128-153.compute-1.amazonaws.com',
        'PORT': '5432',
    }
}

db_from_env = dj_database_url.config(conn_max_age=500, ssl_require=True)
DATABASES['default'].update(db_from_env)

in_heroku = False
if 'DATABASE_URL' in os.environ:
    in_heroku = True

if in_heroku:
    print("HEROKU DB")
    db_from_env = dj_database_url.config(conn_max_age=500, ssl_require=True)
    H_DATABASES['default'].update(db_from_env)
    H_DATABASES = {'default': dj_database_url.config()}
else:
    print("POSTGRES DB")
    DATABASES

CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
    "http://localhost:8001",
    "http://localhost:8000",
    "https://py3-test-app.herokuapp.com",
    'http://localhost:5432',
)

# Stripe

STRIPE_PUBLIC_KEY = config('STRIPE_TEST_PUBLIC_KEY')
STRIPE_SECRET_KEY = config('STRIPE_TEST_SECRET_KEY')