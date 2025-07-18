# Node20 + Yarn 4 image for standalone local development
FROM node:20

# Set the working directory
WORKDIR /app

# Enable corepack and prepare Yarn
RUN corepack enable && corepack prepare yarn@4.2.2 --activate

# Expose the application port
EXPOSE 3000
