# DEMOSPLAN UI

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Common Changelog](https://common-changelog.org/badge.svg)](https://common-changelog.org)

Vue components, Vue directives, Design Token and Scss files to build interfaces for demosPlan.

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
