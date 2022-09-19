const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

/**
 *  @type {import("@jest/types").Config.InitialOptions}
 */
const customJestConfig = {
  clearMocks: true,

  coverageProvider: "v8",

  roots: [],

  setupFiles: ["<rootDir>/tests/setupGlobals.ts"],

  setupFilesAfterEnv: ["<rootDir>/tests/setupAfterEnv.ts"],

  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/tests/__mocks__/styleMock.ts",
  },

  testEnvironment: "jsdom",

  testMatch: ["**/__tests__/**/?(*.)+(spec).ts?(x)", "**/?(*.)+(spec).ts?(x)"],

  transformIgnorePatterns: [],

  testTimeout: 10000,
};

export default async (...args: any[]) =>
  createJestConfig(customJestConfig)(...args);
