release: python manage.py migrate
web: daphne home.asgi.dev:application --port $PORT --bind 0.0.0.0 -v2
worker: python manage.py runworker -v2