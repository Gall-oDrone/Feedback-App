'''Use this for production'''
from .base import *
import dj_database_url

DEBUG = False
ALLOWED_HOSTS += ['py3-test-app.herokuapp.com', '*'] 
WSGI_APPLICATION = 'home.wsgi.prod.application'

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