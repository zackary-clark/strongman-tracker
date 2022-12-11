#!/bin/sh -eu
./generate_env_js.sh >/usr/share/nginx/html/env.js
nginx -g "daemon off;"