#!/bin/bash

# start docker image
docker run -p 27017:27017 --name tracker-mongo -d mongo:latest

echo "Waiting for docker image to start...";
sleep 5;

# create DB within docker image
docker exec tracker-mongo mongo 127.0.0.1:27017/tracker
