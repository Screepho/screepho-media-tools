# Use Python base image
FROM python:3.9-slim

# Install Node.js, npm, and ffmpeg
RUN apt-get update && apt-get install -y nodejs npm ffmpeg && apt-get clean

# Install yt-dlp
RUN python3 -m pip install --no-cache-dir --upgrade pip setuptools wheel && \
    python3 -m pip install --no-cache-dir yt-dlp

# Set the working directory
WORKDIR /app

# Copy Node.js dependencies
COPY package.json .
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
