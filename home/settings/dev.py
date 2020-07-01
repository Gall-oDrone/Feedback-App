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
            "hosts": [('127.0.0.1', 6379), os.environ.get('REDIS_URL', 'redis://localhost:6379')],
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
#···
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
STRIPE_WEBHOOK_SIGNING_KEY = os.environ.get('STRIPE_WEBHOOK_SIGNING_KEY')

# #AWS
# AWS_ACCESS_KEY_ID = 'AKIAJE7FLPGNFBSDTZXQ'
# AWS_SECRET_ACCESS_KEY ='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' 
# AWS_STORAGE_BUCKET_NAME ='py3-test-app-bucket'

# AWS_DEFAULT_ACL = None
# AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
# AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=86400'}

# STATIC_LOCATION = 'static'
# STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/${STATIC_LOCATION}/'
# STATICFILES_STORAGE = 'home.settings.storage_backends.StaticStorage'
# STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]

# PUBLIC_MEDIA_LOCATION = 'media'
# MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{PUBLIC_MEDIA_LOCATION}/'
# DEFAULT_FILE_STORAGE = 'home.settings.storage_backends.MediaStorage'