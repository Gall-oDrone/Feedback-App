'''Use this for production'''
from .base import *
import dj_database_url

DEBUG = False
ALLOWED_HOSTS += ['py3-test-app.herokuapp.com', '*'] 
WSGI_APPLICATION = 'home.wsgi.prod.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'd2sgdtgibmkt3q',
        'USER': 'wvbpaxtwmpwkue',
        'PASSWORD': 'e922621b08ee02a41439f60c23844a9bee221e556f3f12a8823bfb3b1d29a4e6',
        'HOST': 'ec2-18-213-176-229.compute-1.amazonaws.com',
        'PORT': '5432',
    }
}

db_from_env = dj_database_url.config(conn_max_age=500)
DATABASES['default'].update(db_from_env)

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]