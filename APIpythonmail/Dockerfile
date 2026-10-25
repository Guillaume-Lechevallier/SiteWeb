FROM python:3.12-slim

WORKDIR /app

COPY APIpythonmail/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn==22.0.0

COPY APIpythonmail/main.py .

ENV PYTHONDONTWRITEBYTECODE=1
EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "1", "--timeout", "45", "main:app"]
