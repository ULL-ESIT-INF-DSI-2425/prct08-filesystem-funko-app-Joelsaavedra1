import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'lcov', 'json'],
      exclude: ['./src/client/**/*'],
      include: [
        'src/**/*.ts',
        'tests/**/*.ts'
      ],
    },
  },
});