import path from 'node:path'
import dotenv from 'dotenv'
import { defineConfig } from 'vitest/config'

dotenv.config({ path: path.join(__dirname, 'tests', '.env.test') })

export default defineConfig({
  test: {
    globals: true,
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    setupFiles: ['tests/setup.ts'],
    include: ['tests/**/*.test.ts'],
    exclude: ['dist'],
    coverage: {
      exclude: ['mocks'],
    },
  },
})
