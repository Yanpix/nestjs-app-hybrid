module.exports = {
    moduleDirectories: [
        "node_modules",
        "src"
    ],
    moduleFileExtensions: [
        "js",
        "json",
        "ts"
    ],
    rootDir: "./",
    testEnvironment: "node",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    moduleNameMapper: {
        "@constants": "<rootDir>/src/shared/constants/index",
        "@filters": "<rootDir>/src/shared/filters/index",
        "@interceptors": "<rootDir>/src/shared/interceptors/index",
        "@middlewares": "<rootDir>/src/shared/middlewares/index",
        "@guards": "<rootDir>/src/shared/guards/index",
        "@decorators": "<rootDir>/src/shared/decorators/index",
        "@exceptions": "<rootDir>/src/shared/exceptions/index",
        "@pipes": "<rootDir>/src/shared/exceptions/index",
        "@helpers": "<rootDir>/src/shared/helpers/index",
    },
    resolver: null
}