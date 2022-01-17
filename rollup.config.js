const typescript = require('@rollup/plugin-typescript');
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: './src/extensions.ts',
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
        file: `./out/extensions.js`,
        sourcemap: false,
    }]
};