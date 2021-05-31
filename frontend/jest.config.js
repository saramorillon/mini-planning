module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/tests/**/*.test.ts*'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@tests/(.*)': '<rootDir>/tests/$1',
  },
}
