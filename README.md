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
2. Make sure `minkube` is running, `minikube start` if it isn't
3. Make sure `kubectl` is using the "minikube" context
4. `eval $(minikube docker-env)` to redirect future docker commands to inside `minikube`
5. `yarn minikube:start` does everything else necessary to deploy the app in minikube
   1. Deletes any current deployment
   2. Builds the frontend, placing it in `./dist`
   3. Builds the docker image (This will only correctly place it inside `minikube` if the first step is done)
   4. Creates the deployment in `minikube`
   5. Opens the running service to `192.168.49.2:32323`, and prints that url to console

#### Shutting Down
1. `yarn minikube:stop` deletes the deployment

## "Releasing"

1. Update `version` in package.json
2. Push to `master`
3. `yarn build`
4. `docker build -t zackaryclark/strongman-tracker:VERSION` 
   - Make sure this terminal has *NOT* been "redirected" to minikube
   - Make sure this `VERSION` matches the new version in package.json
5. `docker push zackaryclark/strongman-tracker:VERSION`
6. TODO: Run this container on K8s Cluster