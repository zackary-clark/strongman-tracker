# Strongman Tracker

Client uses React, Typescript, Webpack, Material UI

***The following steps assume the dev machine is an Apple Silicon Mac***

If that is *not* the case, qemu can be used to emulate ARM64, and minikube can be used in place of Docker Desktop.

## Running Locally

### Webpack Dev Server

1. `npm install` to install dependencies
2. `npm run dev` to run, on `localhost:8081`
    - Assumes the API is running on `:8080`, and proxies to that

### Docker Desktop K8s

#### Starting Up
1. Make sure Docker Desktop is running, including K8s
2. `npm run kubelocal:start` does everything necessary to deploy the app in docker-desktop-k8s
   1. Builds the frontend, placing it in `./dist`
   2. Builds the docker image
   3. Creates the deployment
   4. Opens the running service at `localhost:32323`

#### Shutting Down
1. `npm run kubelocal:stop` deletes the deployment

## Releasing/Deploying

1. Commit the ready-to-be-released code to `develop`
2. Run `npm version` to:
   1. Update `version` in package.json
   2. Push to `develop` with git tag
   3. Build, tag and push the docker image to Docker Hub
   4. Rollout deployment on cluster
