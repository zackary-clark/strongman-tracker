module.exports = {
    "setupFilesAfterEnv": [
        "<rootDir>/src/setupTests"
    ],
    "moduleNameMapper": {
        "\\.(css|less|scss)$": "identity-obj-proxy"
    },
    globals: {
        "PACKAGE_VERSION": "0.0.0",
    },
    testEnvironment: "jest-environment-jsdom"
}