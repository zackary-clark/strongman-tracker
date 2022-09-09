// This file *only* defines default values and types
// To get values when running in K8s/Docker they *must* be added to generate_env_js as well

export {};
declare global {
    let PACKAGE_VERSION: string | undefined;

    interface Window {
        API_ADDRESS: string;
        KC_REALM: string;
        KC_URL: string;
        KC_CLIENT_ID: string;
    }
}

window.API_ADDRESS="http://localhost:8082/graphql";
window.KC_REALM="Tracker";
window.KC_URL="http://keycloak:8080/";
window.KC_CLIENT_ID="tracker";
