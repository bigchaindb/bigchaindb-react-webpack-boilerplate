/* eslint-disable strict, no-console, object-shorthand */
/* eslint-disable import/no-extraneous-dependencies, import/newline-after-import */
'use strict';

const path = require('path');

const webpack = require('webpack');
const autoPrefixer = require('autoprefixer');
const combineLoaders = require('webpack-combine-loaders');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

require('dotenv').load({path: '../.env', silent: true});

const PRODUCTION = process.env.NODE_ENV === 'production';
const EXTRACT = process.env.NODE_ENV === 'extract';

const PATHS = {
    BUILD: path.resolve(__dirname, 'build'),
    DIST: path.resolve(__dirname, 'dist'),
    NODE_MODULES: path.resolve(__dirname, 'node_modules'),
};

/** EXTERNAL DEFINITIONS INJECTED INTO APP **/
const DEFINITIONS = {
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        BDB_SERVER_URL: JSON.stringify(`${process.env.BDB_SERVER_URL || 'http://localhost:49984'}`),
        CARPASS_SERVER_URL: JSON.stringify(`${process.env.CARPASS_SERVER_URL || 'http://localhost:49986'}`),
    },
};

console.log('DEFINITIONS:', DEFINITIONS);

/** PLUGINS **/
const PLUGINS = [
    new webpack.DefinePlugin(DEFINITIONS),
    new webpack.NoEmitOnErrorsPlugin(),
];

const PROD_PLUGINS = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {
            comments: false
        },
        sourceMap: true,
    }),
    new webpack.LoaderOptionsPlugin({
        debug: false,
        minimize: true
    }),
];

const EXTRACT_CSS_PLUGIN = new ExtractTextPlugin(
    PRODUCTION ? '[name]/styles.min.css' : '[name]/styles.css', {
        allChunks: true
    }
);

if (EXTRACT || PRODUCTION) {
    PLUGINS.push(EXTRACT_CSS_PLUGIN);
}

if (PRODUCTION) {
    PLUGINS.push(...PROD_PLUGINS);
}


/** LOADERS **/
const JS_LOADER = combineLoaders([
    {
        loader: 'babel-loader',
        query: {
            cacheDirectory: true,
        },
    },
]);

const CSS_LOADER = combineLoaders([
    {
        loader: 'css-loader',
        query: {
            sourceMap: true
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            options: { /* PostCSS Options */ },
            plugins: () => [ autoPrefixer() ]  }
    },
    {
        loader: 'sass-loader',
        query: {
            precision: '8', // See https://github.com/twbs/bootstrap-sass#sass-number-precision
            outputStyle: 'expanded',
            sourceMap: true
        }
    },
]);

const LOADERS = [
    {
        test: /\.jsx?$/,
        exclude: [PATHS.NODE_MODULES],
        loader: JS_LOADER,
    },
    {
        test: /\.json$/,
        loader: 'json'
    },
    {
        test: /\.s[ac]ss$/,
        exclude: [PATHS.NODE_MODULES],
        loader: PRODUCTION || EXTRACT ? ExtractTextPlugin.extract('style-loader', CSS_LOADER)
            : `style-loader!${CSS_LOADER}`,
    },
    {
        test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        loader: 'url-loader?limit=100000'
    },
];

module.exports = {
    devtool: 'source-map',
    entry: {
        'app': [
            //'babel-polyfill',
            'react-hot-loader/patch',
            './src/index'
        ]
    },
    output: {
        path: PRODUCTION ? PATHS.DIST : PATHS.BUILD,
        filename: PRODUCTION ? '[name].min.js' : '[name].js'
    },

    plugins: PLUGINS,

    module: {
        rules: LOADERS,
    },
};
