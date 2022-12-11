// We use an anonymous functions so that env.js has "time" to alter the global window before accessing

export const getVersion = (): string | undefined => PACKAGE_VERSION;
export const getApiAddress = (): string => window.API_ADDRESS;
export const getAuthZeroDomain = (): string => window.AUTH_ZERO_DOMAIN;
export const getAuthZeroClientId = (): string => window.AUTH_ZERO_CLIENT_ID;
