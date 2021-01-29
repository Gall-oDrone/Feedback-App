'''Use this for production'''
from .base import *
import dj_database_url

DEBUG = False
ALLOWED_HOSTS += ['py3-test-app.herokuapp.com', '*', 'www.matecrunch.com'] 
WSGI_APPLICATION = 'home.wsgi.prod.application'
ASGI_APPLICATION = "home.asgi.routing.application"

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
        'NAME': "d2f0i5ch7mim3a",
        'USER': "fprocgmtgzampz",
        'PASSWORD': "1309fcda6332a3961b01fb8a47ba69f0138d0fecb60b43b1b46edac18e175f5a",
        'HOST': 'ec2-54-210-128-153.compute-1.amazonaws.com',
        'PORT': '5432',
    }
}

db_from_env = dj_database_url.config(conn_max_age=500, ssl_require=True)
DATABASES['default'].update(db_from_env)

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Stripe

STRIPE_PUBLIC_KEY = config('STRIPE_TEST_PUBLIC_KEY')
STRIPE_SECRET_KEY = config('STRIPE_TEST_SECRET_KEY')
STRIPE_WEBHOOK_SIGNING_KEY = os.environ.get('STRIPE_WEBHOOK_SIGNING_KEY')

#AWS
AWS_ACCESS_KEY_ID = 'AKIAIRTLBPQ7C24IDY3A'
AWS_SECRET_ACCESS_KEY ='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' 
AWS_STORAGE_BUCKET_NAME ='py3-test-app-bucket'

AWS_DEFAULT_ACL = None
AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=86400'}

STATIC_LOCATION = 'static'
STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/${STATIC_LOCATION}/'
STATICFILES_STORAGE = 'home.settings.storage_backends.StaticStorage'

PUBLIC_MEDIA_LOCATION = 'media'
MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/${PUBLIC_MEDIA_LOCATION}/'
DEFAULT_FILE_STORAGE = 'home.settings.storage_backends.MediaStorage'

STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]