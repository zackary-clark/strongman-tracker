module.exports = {
    "setupFilesAfterEnv": [
        "<rootDir>/spec/setupTests"
    ],
    "moduleNameMapper": {
        "\\.(css|less|scss)$": "identity-obj-proxy"
    },
    testEnvironment: "jest-environment-jsdom"
}