// Rollup plugins
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

export default [
  {
    input: 'src/index.js',
    output: {
      format: 'umd',
      file: 'dist/htsx.min.js',
      name: 'htsx',
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      replace({
        ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      }),
      (process.env.NODE_ENV === 'production' && uglify()),
    ],
  },
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      file: 'dist/htsx.esm.min.js',
      name: 'htsx',
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      replace({
        ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      }),
      (process.env.NODE_ENV === 'production' && uglify()),
    ],
  },
];
