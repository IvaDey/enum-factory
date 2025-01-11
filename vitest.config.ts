/// <reference types="vitest" />
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    typecheck: {
      enabled: true,
    },
    coverage: {
      enabled: true,
      include: ['**/src/**'],
    },
  },
});
