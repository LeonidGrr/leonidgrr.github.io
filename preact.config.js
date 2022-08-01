import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

export default (config, env, helpers) => {
    config.plugins.push(
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/assets/draco'),
                to: path.resolve(__dirname, 'build/draco'),
            }],
        }),
    );

    const fileLoader = helpers.getLoadersByName(config, 'file-loader');
    fileLoader.map(entry => entry.rule.test = /\.(svg|woff2?|ttf|eot|jpe?g|png|webp|gif|mp4|mov|ogg|webm|glb|gltf)(\?.*)?$/i);
    
    const urlLoader = helpers.getLoadersByName(config, 'url-loader');
    urlLoader.map(entry => entry.rule.test = /\.(svg|woff2?|ttf|eot|jpe?g|png|webp|gif|mp4|mov|ogg|webm|glb|gltf)(\?.*)?$/i);

    const rawLoader = helpers.getLoadersByName(config, 'raw-loader');
    rawLoader.map(entry => entry.rule.test = /\.(xml|html|txt|md|glsl)$/);

    config.resolve.extensions.push('.glsl');
    config.resolve.extensions.push('.glb');
    config.resolve.extensions.push('.gltf');

    config.resolve.modules.push(env.src)
};
