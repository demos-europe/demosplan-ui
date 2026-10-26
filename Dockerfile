# Node20 + Yarn 4 image for standalone local development
FROM node:20

# Set the working directory
WORKDIR /app

# Enable corepack and prepare Yarn
RUN corepack enable && corepack prepare yarn@4.2.2 --activate

# The bind-mounted /app is owned by the host user, git refuses it for root (Storybook change detection)
RUN git config --system --add safe.directory /app

# Expose the application port
EXPOSE 3000
