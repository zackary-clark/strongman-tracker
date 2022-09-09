// We use an anonymous functions so that env.js has "time" to alter the global window before accessing

export const getVersion = (): string | undefined => PACKAGE_VERSION;
export const getApiAddress = (): string => window.API_ADDRESS;
export const getKeycloakURL = (): string => window.KC_URL;
export const getKeycloakRealm = (): string => window.KC_REALM;
export const getKeycloakClientId = (): string => window.KC_CLIENT_ID;
