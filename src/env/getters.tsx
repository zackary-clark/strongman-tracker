// We use an anonymous functions so that env.js has "time" to alter the global window before accessing

declare const PACKAGE_VERSION: string;

export const getVersion = (): string | undefined => PACKAGE_VERSION;
export const getHostAddress = (): string => window.REACT_APP_HOST_ADDRESS;
export const getKeycloakURL = (): string => window.KC_URL;
export const getKeycloakRealm = (): string => window.KC_REALM;
export const getKeycloakClientId = (): string => window.KC_CLIENT_ID;
