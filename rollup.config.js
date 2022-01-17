const typescript = require('@rollup/plugin-typescript');
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
const replace = require('@rollup/plugin-replace');

export default {
    input: './src/main.ts',
    // external: id => ['vscode'].includes(id),
    plugins: [
        nodeResolve(),
        commonjs(),
        typescript({
            exclude: 'node_modules/**',
            typescript: require('typescript'),
        }),
    ],

    output: [{
        format: 'es',
        file: `./dist/main.js`,
        sourcemap: false,
    }]
};