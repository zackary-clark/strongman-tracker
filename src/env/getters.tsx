// We use an anonymous functions so that env.js has "time" to alter the global window before accessing

export const getHostAddress = (): string => window.REACT_APP_HOST_ADDRESS;
