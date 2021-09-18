# Strongman Tracker

Client uses React, Typescript, Webpack, Material UI, and React Context API

## Running Locally

### Webpack Dev Server

#### Starting Up
1. `yarn` to install dependencies
2. `yarn dev` to run, with dashboard, on `localhost:8081`
    Assumes the API is running on `:8080`, and proxies to that

#### Shutting Down
1. Simply `ctrl-C` in the terminal window

### Minikube

#### Starting Up
1. Make sure docker daemon is running
2. Make sure `minikube` is running, `minikube start` if it isn't
3. Make sure `kubectl` is using the "minikube" context
4. `eval $(minikube docker-env)` to redirect future docker commands to inside `minikube`
5. `yarn minikube:start` does everything else necessary to deploy the app in minikube
   1. Builds the frontend, placing it in `./dist`
   2. Builds the docker image (This will only correctly place it inside `minikube` if the "redirection" step is done)
   3. Creates the deployment in `minikube`
   4. Opens the running service to `192.168.49.2:32323` and prints that url to console

#### Shutting Down
1. `yarn minikube:stop` deletes the deployment

## Releasing/Deploying

### One time `qemu` prep
1. Install `qemu` and `qemu-user-static` on dev machine
2. Run `docker run --rm --privileged multiarch/qemu-user-static --reset -p yes`

Now you can build arm64 images from your x86 dev machine

### Release Steps
***Make sure this terminal has NOT been "redirected" to minikube***

1. Commit the ready-to-be-released code
2. Run `yarn version` to:
   1. Update `version` in package.json
   2. Push to `develop` with git tag
   3. Build, tag and push the docker image to Docker Hub
3. `kubectl config use-context prod`
4. `kubectl apply -f kubernetes/production-deployment.yml`
