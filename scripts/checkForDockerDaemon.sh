#!/bin/bash

if (! docker stats --no-stream ); then
  echo "Cannot build release without Docker Daemon"
  exit 1;
fi
exit 0;
