import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/index.ts',
  output: {
    file: './dist/index.js',
    format: 'es',
    name: 'bundle',
  },
  plugins: [resolve(), typescript(), terser()],
};
