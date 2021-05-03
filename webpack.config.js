/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        wasmLoading: 'fetch',
    },
    devServer: {
        contentBase: path.join(__dirname, '/dist'),
        hot: true,
        compress: true,
    },
    mode: 'production',   
    devtool: 'source-map',
    experiments: {
        syncWebAssembly: true,
    },
    module: {
        rules: [
            {
                test: /\.wasm$/,
                type: 'webassembly/sync',
            },
            {
                test: /\.ts(x?)$/,
                use: 'ts-loader',
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'old'),
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader',
                ],
              },
            {
                test: /\.(glb|gltf|fbx)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'models/[hash][ext][query]',
                },
            },
            {
                test: /\.(ogg|aac|mp3)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'sounds/[hash][ext][query]',
                },
            },
            {   
                test: /.(jpe?g|png)$/i,
                include: path.resolve(__dirname, 'src', 'textures'),
                type: 'asset/resource',
                generator: {
                    filename: 'textures/[hash][ext][query]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/inline',
            },
            {
                test: /\.glsl$/,
                use: {
                    loader: 'webpack-glsl-loader',
                    options: {
                        name: './shaders/[name].[ext]',
                    },
                },
            },
            
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',   
        },
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CompressionPlugin({
            algorithm: 'gzip',
            filename: '[path].gz[query]',
            test: /\.(css|html|js|svg|ttf)$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
        new CompressionPlugin({
            algorithm: 'brotliCompress',
            compressionOptions: {
                level: 11,
            },
            filename: '[path].br[query]',
            test: /\.(css|html|js|svg|ttf)$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
        // new CopyPlugin({
        //     patterns: [
        //         { from: path.resolve(__dirname, 'src', 'models'), to: 'models' },
        //         { from: path.resolve(__dirname, 'src', 'textures'), to: 'textures' },
        //     ],
        // }),
    ],
};
