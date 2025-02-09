/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/
  preset: "ts-jest/presets/default-esm",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    // "^@ipikuka/mdx$": "<rootDir>/src/index.ts",
    // "^@ipikuka/mdx/(.*)$": "<rootDir>/src/$1.ts",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  prettierPath: require.resolve("prettier-2"),
};
