import { nodeResolve } from '@rollup/plugin-node-resolve';
import ttypescript from 'ttypescript';
import tsPlugin from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './src/bot.ts',
  output: {
    dir: 'dist',
    entryFileNames: 'index.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    nodeResolve(),
    tsPlugin({
      typescript: ttypescript,
    }),
    commonjs(),
  ],
};
