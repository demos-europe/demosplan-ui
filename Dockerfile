# Node20 + Yarn 4 image for standalone local development
FROM node:20

# Set the working directory
WORKDIR /app

# Enable corepack and prepare Yarn
RUN corepack enable && corepack prepare yarn@stable --activate

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application code
COPY . .

# Use the non-root "node" user provided by the base image
USER node

# Expose the application port (if needed)
EXPOSE 3000
