/// <reference types="vitest" />
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      include: ['**/src/**'],
    },
  },
});
