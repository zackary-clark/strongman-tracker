import Keycloak from "keycloak-js";
import { createContext, useContext } from "react";

export type UserInfo = {
    /** Keycloak user ID (uuid) */
    id: string,
    username: string,
    emailVerified: boolean,
    name?: string,
    givenName?: string,
    familyName?: string,
    email?: string
};

const defaultKeycloak = new Keycloak();

export const KeycloakContext = createContext(defaultKeycloak);

export const useKeycloak = (): Keycloak => useContext(KeycloakContext);
export const useAuthenticated = (): boolean => !!useContext(KeycloakContext).authenticated;
export const useUserInfo = (): UserInfo | undefined => {
    const tokenParsed = useContext(KeycloakContext).tokenParsed;
    // @ts-ignore
    return tokenParsed ? {
        // @ts-ignore bad keycloak typing for userInfo
        id: tokenParsed.sub,
        // @ts-ignore
        username: tokenParsed.preferred_username,
        // @ts-ignore
        emailVerified: tokenParsed.email_verified,
        // @ts-ignore
        name: tokenParsed.name,
        // @ts-ignore
        givenName: tokenParsed.given_name,
        // @ts-ignore
        familyName: tokenParsed.family_name,
        // @ts-ignore
        email: tokenParsed.email
    } : undefined;
};
