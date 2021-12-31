module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['dist'],
  coveragePathIgnorePatterns: ['mocks'],
  testMatch: ['<rootDir>/tests/**/*.test.ts*'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
}
