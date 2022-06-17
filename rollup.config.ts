import * as path from 'node:path'
import { babel as pluginBabel } from '@rollup/plugin-babel'
import pluginCommonjs from '@rollup/plugin-commonjs'
import pluginNodeResolve from '@rollup/plugin-node-resolve'
import pluginTypescript from '@rollup/plugin-typescript'
import camelCase from 'lodash.camelcase'
import upperFirst from 'lodash.upperfirst'
import pluginDts from 'rollup-plugin-dts'
import { terser as pluginTerser } from 'rollup-plugin-terser'
import package_ from './package.json'

const moduleName = upperFirst(camelCase(package_.name.replace(/^@.*\//, '')))

const banner = `/*!
  ${moduleName}.js v${package_.version}
  ${package_.homepage}
  Released under the ${package_.license} License.
*/`

const BABELRC = '.babelrc.js'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        banner,
        file: package_.browser,
        format: 'iife',
        name: moduleName,
        sourcemap: 'inline',
      },
      {
        banner,
        file: package_.browser.replace('.js', '.min.js'),
        format: 'iife',
        name: moduleName,
        plugins: [pluginTerser()],
      },
    ],
    plugins: [
      pluginTypescript(),
      pluginCommonjs({
        extensions: ['.js', '.ts'],
      }),
      pluginBabel({
        babelHelpers: 'bundled',
        configFile: path.resolve(__dirname, BABELRC),
      }),
      pluginNodeResolve({
        browser: true,
      }),
    ],
  },
  {
    external: [
      ...Object.keys(package_.devDependencies || {}),
    ],
    input: 'src/index.ts',
    output: [
      {
        banner,
        exports: 'named',
        file: package_.module,
        format: 'esm',
        sourcemap: 'inline',
      },
    ],
    plugins: [
      pluginTypescript(),
      pluginBabel({
        babelHelpers: 'bundled',
        configFile: path.resolve(__dirname, BABELRC),
      }),
    ],
  },
  {
    external: [
      ...Object.keys(package_.devDependencies || {}),
    ],
    input: 'src/index.ts',
    output: [
      {
        banner,
        file: package_.main,
        format: 'cjs',
        sourcemap: 'inline',
      },
    ],
    plugins: [
      pluginTypescript(),
      pluginBabel({
        babelHelpers: 'bundled',
        configFile: path.resolve(__dirname, BABELRC),
      }),
    ],
  },
  {
    external: [],
    input: 'src/index.ts',
    output: [
      {
        banner,
        file: package_.types,
        format: 'esm',
      },
    ],
    plugins: [pluginDts({ respectExternal: true })],
  },
]
