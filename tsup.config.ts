import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/'],
  splitting: false,
  sourcemap: 'inline',
  clean: true,
  platform: 'browser',
  outDir: 'dist',
  dts: true,
  format: ['cjs', 'esm'],
  bundle: true,
})
