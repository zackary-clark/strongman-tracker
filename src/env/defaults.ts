// This file *only* defines default values and types
// To get values when running in K8s/Docker they *must* be added to generate_env_js as well

export {};
declare global {
    interface Window {
        REACT_APP_HOST_ADDRESS: string;
    }
}

window.REACT_APP_HOST_ADDRESS="/graphql";
