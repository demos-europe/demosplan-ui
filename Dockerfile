# Node24 + Yarn 4 image for standalone local development
FROM node:24.22.1

# Set the working directory
WORKDIR /app

# Enable corepack and prepare Yarn; trust the bind-mounted /app in git (owned by the host user, refused for root otherwise,
# breaks Storybook change detection)
RUN corepack enable && corepack prepare yarn@4.2.2 --activate \
    && git config --system --add safe.directory /app

# Expose the application port
EXPOSE 3000
