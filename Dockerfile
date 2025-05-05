# Node20 + Yarn 4 image for standalone local development
FROM node:20

# Set the working directory
WORKDIR /app

# Enable corepack and prepare Yarn
RUN corepack enable && corepack prepare yarn@stable --activate

# Use default user ID
USER node:1000

# Expose the application port
EXPOSE 3000
