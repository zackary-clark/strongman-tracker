import Keycloak from "keycloak-js";
import { UserInfo } from "../../src/context/keycloakContext";

export const defaultFakeUser: UserInfo = {
    id: "6fcb064d-e78d-4a48-ba90-8ad6ecbead40",
    username: "FakeUser",
    emailVerified: true,
    name: "Fake User",
    givenName: "Fake",
    familyName: "User",
    email: "fake@user.test"
};

export const createKeycloakMock = (
    hasRealmRole: (role: string) => boolean = () => true,
    hasResourceRole: (role: string, resource?: string) => boolean = () => true,
    userInfo = defaultFakeUser,
    authenticated = true
): Keycloak => {
    const tokenParsed = {
        sub: userInfo.id,
        preferred_username: userInfo.username,
        email_verified: userInfo.emailVerified,
        name: userInfo.name,
        given_name: userInfo.givenName,
        family_name: userInfo.familyName,
        email: userInfo.email,
    };

    return {
        authenticated: authenticated,
        hasRealmRole: hasRealmRole,
        hasResourceRole: hasResourceRole,
        tokenParsed,
        login: jest.fn(),
        logout: jest.fn(),
        init: jest.fn(),
        userInfo: undefined,
        accountManagement: jest.fn(),
        clearToken: jest.fn(),
        createAccountUrl: jest.fn(),
        createLoginUrl: jest.fn(),
        createLogoutUrl: jest.fn(),
        createRegisterUrl: jest.fn(),
        isTokenExpired: jest.fn(),
        loadUserInfo: jest.fn(),
        loadUserProfile: jest.fn(),
        register: jest.fn(),
        updateToken: jest.fn()
    };
};
