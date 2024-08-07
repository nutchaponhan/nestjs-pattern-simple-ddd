/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: ['<rootDir>'],
  collectCoverageFrom: [
    'src/app/**/*.controller.ts',
    'src/service/**/*.service.ts',
    'src/app/**/*.usecase.ts',
    'src/repo/**/*.repo.ts',
    'src/app/**/*.entity.ts',
  ],
};
