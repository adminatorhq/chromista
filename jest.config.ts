const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

/**
 *  @type {import("@jest/types").Config.InitialOptions}
 */
const customJestConfig = {
  clearMocks: true,

  coverageProvider: "v8",

  collectCoverageFrom: ["src/**/*.{ts,tsx}"],

  moduleDirectories: ["node_modules", "src"],

  modulePaths: ["<rootDir>/src"],

  roots: ["src"],

  setupFiles: ["<rootDir>/tests/setupGlobals.ts"],

  setupFilesAfterEnv: ["<rootDir>/tests/setupAfterEnv.ts"],

  testEnvironment: "jsdom",

  testMatch: ["**/__tests__/**/?(*.)+(spec).ts?(x)", "**/?(*.)+(spec).ts?(x)"],

  transformIgnorePatterns: [],

  testTimeout: 10000,
};

export default async (...args: any[]) =>
  createJestConfig(customJestConfig)(...args);
