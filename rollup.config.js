// Rollup plugins
import minify from 'rollup-plugin-babel-minify';

export default [
  {
    input: 'src/index.js',
    output: {
      format: 'es',
      file: 'dist/htsx.esm.min.js',
      name: 'htsx',
    },
    plugins: [
      minify(),
    ],
  },
  {
    input: 'src/index.js',
    output: {
      format: 'iife',
      file: 'dist/htsx.min.js',
      name: 'htsx',
    },
    plugins: [
      minify(),
    ],
  },
];
