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

Storybook only listens on loopback by default, which is not reachable from the host browser inside a container.
`yarn sb` therefore binds to the container's own address when it runs in a container. The URL depends on where it runs:

- Host: http://localhost:3000
- demosplan-ui container: http://localhost:6006
- demosplan-core container: http://172.22.255.2:3000
