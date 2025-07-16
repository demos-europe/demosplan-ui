# Node20 + Yarn 4 image for standalone local development
FROM node:20

# Set the working directory
WORKDIR /app

# Enable corepack and prepare Yarn
RUN corepack enable && corepack prepare yarn@4.2.2 --activate

# Set proper permissions for the working directory
RUN chown -R node:node /app

# Use default user ID
USER node:1000

# Expose the application port
EXPOSE 3000
