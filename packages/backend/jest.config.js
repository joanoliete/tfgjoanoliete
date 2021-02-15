const { pathsToModuleNameMapper } = import('ts-jest/utils');
const { compilerOptions } = import('./tsconfig');
const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
	prefix: '<rootDir>/',
});

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testTimeout: 30000,
	moduleNameMapper,
	coverageDirectory: 'coverage',
	modulePathIgnorePatterns: ['<rootDir>/dist-test/'],
	reporters: ['default', ['jest-junit', { outputDirectory: 'coverage' }]],
};
