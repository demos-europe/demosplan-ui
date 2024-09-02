# DEMOSPLAN UI

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Common Changelog](https://common-changelog.org/badge.svg)](https://common-changelog.org)

Vue components, Vue directives, Design Token and Scss files to build interfaces for demosPlan.

### Using the local Docker container

To have a consistent environment for building demosplan-ui, a Docker configuration exists.
For Docker Compose 1, the syntax has to be adapted to `docker-compose` instead of `docker compose`. 
The below commands use Docker Compose 2 syntax.

```shell
# Start the container
docker compose -f docker-compose.local.yml up -d

# Shell into the container
docker compose -f docker-compose.local.yml exec demosplan_ui_local sh

# Stop container
docker compose -f docker-compose.local.yml down
```
