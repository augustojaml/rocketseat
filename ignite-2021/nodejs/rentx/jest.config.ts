// eslint-disable-next-line import/no-extraneous-dependencies
import { pathsToModuleNameMapper } from 'ts-jest/utils';

import { compilerOptions } from './tsconfig.json';

export default {
  bail: 0,
  clearMocks: true,
  collectCoverage: true,
  // If want test in controllers
  collectCoverageFrom: ['<rootDir>/src/modules/**/useCases/**/*.ts'],
  // collectCoverageFrom: ['<rootDir>/src/modules/**/useCases/**/*UseCase.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'lcov'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
  preset: 'ts-jest',
  testMatch: ['**/*.spec.ts'],
};
