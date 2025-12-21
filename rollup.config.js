import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';

const name = 'DiagramJsOperator';

export default [
  // ESM, CJS, UMD bundles
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/diagram-js-operator.esm.js', format: 'es' },
      { file: 'dist/diagram-js-operator.cjs.js', format: 'cjs' },
      {
        file: 'dist/diagram-js-operator.umd.js',
        format: 'umd',
        name: name,
        globals: {
          'diagram-js': 'Diagram'
        }
      }
    ],
    external: ['diagram-js'], // 不打包 diagram-js
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' })
    ]
  },
  // 类型声明文件
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()]
  }
];