FROM python:3.10-slim

WORKDIR /app

# Copy dependencies first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the code
COPY . .

# Expose the API port
EXPOSE 8000