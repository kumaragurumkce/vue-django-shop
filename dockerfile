# Use an official Python runtime as a parent image
FROM python:3.12

# Set the working directory in the container
WORKDIR /app

# Install system dependencies for building Python packages
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    python3-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy the current directory contents into the container at /app
COPY . /app

# Create and activate virtual environment
RUN python -m venv /opt/venv

# Ensure virtual environment is activated
ENV PATH="/opt/venv/bin:$PATH"

# Upgrade pip and install any needed packages specified in requirements.txt
RUN pip install --upgrade pip setuptools wheel && \
    pip install -r requirements.txt

# Expose port 8000 for Django
EXPOSE 8000

# Run the Django application using Gunicorn
CMD ["gunicorn", "railwaydeploy.wsgi:application", "--bind", "0.0.0.0:8000"]
