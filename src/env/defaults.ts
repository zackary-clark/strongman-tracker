// This file *only* defines default values and types
// To get values when running in K8s/Docker they *must* be added to generate_env_js as well

export {};
declare global {
    interface Window {
        REACT_APP_HOST_ADDRESS: string;
        KC_REALM: string;
        KC_URL: string;
        KC_CLIENT_ID: string;
    }
}

window.REACT_APP_HOST_ADDRESS="http://localhost:8080/graphql";
window.KC_REALM="Tracker";
window.KC_URL="http://localhost:8082/";
window.KC_CLIENT_ID="tracker";
