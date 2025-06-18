# DEMOSPLAN UI

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Common Changelog](https://common-changelog.org/badge.svg)](https://common-changelog.org)

Vue components, Vue directives, Design Token and Scss files to build interfaces for demosPlan.

## Development

### Using the local Docker container for development

To have a consistent environment for building demosplan-ui, a Docker configuration exists.

```shell
# When running it for the first time, build the container
docker compose build

# Start the container in detached mode
docker compose up -d

# Shell into the container
docker compose exec demosplan-ui bash

# Stop container
docker compose down
```

### Starting Storybook

Storybook is used for developing and documenting UI components. To start the Storybook server,
open a shell in the Docker container (see "Using the local Docker container") and run the following commands:

```shell
# Install dependencies (if not already installed)
yarn install

# Start Storybook development server
yarn sb
```

Once started, Storybook will be available at http://localhost:3000 by default.
