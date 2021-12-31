const path = require('path')
require('dotenv').config({ path: path.join(__dirname, 'tests', '.env.test') })

module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  modulePathIgnorePatterns: ['dist'],
  coveragePathIgnorePatterns: ['mocks'],
  displayName: 'node',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
}
