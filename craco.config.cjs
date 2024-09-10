const path = require("path");

module.exports = {
    webpack: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@components": path.resolve(__dirname, "src", "components"),
        },
    },
    jest: {
        configure: {
            verbose: true,
            moduleNameMapper: {
                '^@/(.*)$': '<rootDir>/src/$1',
                '^@components/(.*)$': '<rootDir>/src/components/$1',
            },
        },
    },
};
