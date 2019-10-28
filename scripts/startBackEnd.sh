#!/usr/bin/env bash

docker start tracker-mongo

# Required for yarn dev, because webpack-dev-server seems to change PORT to 5100
export PORT=8080

./gradlew bootRun