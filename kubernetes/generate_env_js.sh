#!/bin/sh -eu

cat <<EOF
window.REACT_APP_HOST_ADDRESS='$REACT_APP_HOST_ADDRESS';
window.KC_REALM='$KC_REALM';
window.KC_URL='$KC_URL';
window.KC_CLIENT_ID='$KC_CLIENT_ID';
EOF
