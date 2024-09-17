# Use an official Python runtime as a parent image
FROM python:3.12

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Create and activate virtual environment
RUN python -m venv /opt/venv

# Ensure virtual environment is activated
ENV PATH="/opt/venv/bin:$PATH"

# Install any needed packages specified in requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

# Expose port 8000 for Django
EXPOSE 8000

# Run the Django application
CMD ["gunicorn", "railwaydeploy.wsgi:application", "--bind", "0.0.0.0:8000"]
