/* eslint-disable */

// This file *only* defines default values and types
// To get values when running in K8s/Docker they *must* be added to generate_env_js as well

export {};
declare global {
    let PACKAGE_VERSION: string | undefined;

    interface Window {
        API_ADDRESS: string;
        AUTH_ZERO_DOMAIN: string;
        AUTH_ZERO_CLIENT_ID: string;
    }
}

window.API_ADDRESS="http://localhost:8082/graphql";
window.AUTH_ZERO_DOMAIN=require("../../.env.json").authZeroDomain;
window.AUTH_ZERO_CLIENT_ID=require("../../.env.json").authZeroClientId;
