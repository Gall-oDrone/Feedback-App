release: python manage.py migrate collectstatic --no-input;
web: gunicorn home.wsgi.prod --log-file -