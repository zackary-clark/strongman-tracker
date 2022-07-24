module.exports = {
    "setupFilesAfterEnv": [
        "<rootDir>/src/setupTests"
    ],
    "moduleNameMapper": {
        "\\.(css|less|scss)$": "identity-obj-proxy"
    },
    testEnvironment: "jest-environment-jsdom"
}