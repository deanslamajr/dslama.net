# dslama.net

[![Build Status](https://travis-ci.org/deanslamajr/dslama.net.svg?branch=master)](https://travis-ci.org/deanslamajr/dslama.net)

A quick and modern about page

# Development
* `npm rm -rf node_modules && npm install`
* `npm run build`
* `npm start`

# Deployment

1. Ensure that `docker` is available on the command line
2. Commit all changes
3. `npm run publish:test|patch|minor|major`
  * This will build and publish the latest image.
  * Take note of the new image tag name. e.g. The tag from the following output is `v2.0.3-10`.
  ```
  v2.0.3-10: digest: sha256:44587ec99bc610dbfc1019da6b486c110eea8275f01eb40176e67187c36c0092 size: 952
  ```
4. Verify image has been promoted to [Docker Hub](https://hub.docker.com/repository/registry-1.docker.io/deanslamajr/dslama.net/tags?page=1)

5. Perform k8s rollout via instructions in `deployment` repo