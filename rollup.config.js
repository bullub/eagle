import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/Eagle.js',
    external: ['jquery'],
    output: {
      name: 'Eagle',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      // so Rollup can find `ms`
      resolve(),
      babel({  // transpile ES2015+ to ES5
        exclude: ['node_modules/**']
      }),
      // so Rollup can convert `ms` to an ES module
      commonjs(),
      // babel({  // transpile ES2015+ to ES5
      //   exclude: ['node_modules/**']
      // })
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/Eagle.js',
    external: ['jquery'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      babel({
        exclude: ['node_modules/**']
      })
    ]
  }
];