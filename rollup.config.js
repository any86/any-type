const typescript = require('@rollup/plugin-typescript');
import { nodeResolve } from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
export default {
    input: './src/extension.ts',
    // external: id => ['vscode'].includes(id),
    plugins: [
        nodeResolve(),
        commonjs(),
        typescript({
            exclude: 'node_modules/**',
            typescript: require('typescript'),
        }),
        terser(),
    ],

    output: [{
        format: 'cjs',
        file: `./out/extension.js`,
        sourcemap: false,
    }]
};