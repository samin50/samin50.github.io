import { defineConfig, globalIgnores } from 'eslint/config';
import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default defineConfig(
  // legacy/ is the old React app, kept for reference until the end of Phase 4.
  globalIgnores(['dist/', '.astro/', 'legacy/', 'docs/', 'node_modules/', 'public/']),
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  eslintPluginAstro.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
    },
  },
);
