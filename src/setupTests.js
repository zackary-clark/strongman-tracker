import "@testing-library/jest-dom";

jest.mock("@auth0/auth0-react", () => ({
    useAuth0: () => ({
        isAuthenticated: true,
        logout: () => {},
        loginWithRedirect: () => {},
    })
}));
