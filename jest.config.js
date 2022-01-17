module.exports = {
    preset: 'ts-jest/presets/js-with-babel',
    testEnvironment: 'jsdom',
    // roots: ['./src/'],
    // testEnvironment: 'jest-environment-jsdom-global',
    testEnvironmentOptions: {
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
    },
    collectCoverage: true,
    coverageDirectory: "./coverage/",
    collectCoverageFrom: [
        './src/**/*.ts'],
    verbose: false,
    testPathIgnorePatterns: ["<rootDir>/node_modules/"],
    coveragePathIgnorePatterns: ["<rootDir>/node_modules/"],
    globals: {
        __TEST__: true,
        __VERSION__: require('./package.json').version,
        ontouchstart: null
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
};