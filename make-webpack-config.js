const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Html文件处理
const rucksack = require('rucksack-css');
const autoprefixer = require('autoprefixer');
const ROOT_PATH = path.resolve(__dirname)
const SRC_PATH = path.join(ROOT_PATH, 'src')
const DIST_PATH = path.join(ROOT_PATH, 'dist')
const TEM_PATH = path.join(ROOT_PATH, 'templates')
const webserverPort = 3001

module.exports = function (options) {
    const entry = {
        main: [path.join(SRC_PATH, 'index')],
//        login:[path.join(SRC_PATH, '/containers/Login')],
        vendor:['react', 'immutable','babel-polyfill','reselect','redux-saga','react-dom']
    };
    const theme = {};
    const module = {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                include: SRC_PATH,
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style-loader',
                    'css?sourceMap&-restructuring&modules&localIdentName=[local]___[hash:base64:5]!'
                    + 'postcss'),
            },
            {
                test: /\.css$/,  /**组件中的CSS如果使用modules模式，可能导致无法找到对应的css名称*/
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
                include: /node_modules/,
            },
            {
                test: /\.json$/,
                loaders: ['json'],
                include: SRC_PATH,
            },
            // {
            //   test: /\.less$/,
            //   loader: ExtractTextPlugin.extract(
            //       'css?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!!' +
            //       'postcss!' +
            //       `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`
            //     ),
            // },
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff'},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/octet-stream'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=image/svg+xml'},
            {test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i, loader: 'url?limit=10000'},
        ],
    }

    const additionalLoaders = [];
    const alias = {};
    const aliasLoader = {};
    const externals = [];
    const modulesDirectories = ['node_modules', 'components', 'src', 'containers'];
    const extensions = ['', '.js', '.jsx'];
    const publicPath = options.devServer ?
    'http://0.0.0.0:' + webserverPort + '/dist/' :
        '/dist/';

    const output = {
        path: DIST_PATH,
        publicPath,
        filename: '[name].js' + (options.longTermCaching ? '?[chunkhash:8]' : ''),
        chunkFilename: '[name].chunk.js'
        + (options.longTermCaching ? '?[chunkhash:8]' : ''), /**动态加载时,如动态模块未配置入口,则使用chunk方式打包,可在require.ensure时命名,使用babel 动态import插件时目前无法命名*/
        sourceMapFilename: 'debugging/[file].map',
    };

    const plugins = [
        new HtmlWebpackPlugin({
         //   title: 'Redux-Example', //也可使用react-helmet 设置
            template: path.join(TEM_PATH, 'index.html'),
            filename: 'index.html',
            inject: 'body',
            favicon: 'favicon.ico',
        }),
        // 	new webpack.PrefetchPlugin("react"),        //预取插件，据说可以加快打包，然而并没有，也许是姿势不对
        // 	new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")
    ];

    if (options.commonsChunk) { /** 分析模块的共用代码, 单独打一个包到中*/
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: 2
    }));
       // plugins.push(new webpack.optimize.CommonsChunkPlugin('common.js',['main','gameList']));
           // + (options.longTermCaching ? '?[chunkhash:8]' : '')));
    }
    if (options.separateStylesheet) {
        plugins.push(new ExtractTextPlugin('[name].css' +
            (options.longTermCaching ? '?[contenthash:8]' : ''))); /**将css文件拆分出来,并为每个模块生成独立css*/
    }
    else {
        plugins.push(new ExtractTextPlugin('style.css' +
            (options.longTermCaching ? '?[contenthash:8]' : ''), {allChunks: true}));/**将css文件拆分出来,并作为一个style.css*/
    }
    if (options.minimize) {  //优化打包尺寸
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                output: {
                    comments: false,  // remove all comments
                },
                compressor: {
                    warnings: false,
                },
            }),
            new webpack.optimize.DedupePlugin()
        );
        new webpack.NoErrorsPlugin();
    }
    plugins.push(
        new webpack.DefinePlugin({  /**全局环境变量定义*/
            'process.env': {
                NODE_ENV: JSON.stringify(options.minimize ? 'production' : 'development'),/**注意除非log类不改变逻辑的判断,否则不要在代码中使用此环境变量动态判断,要使用新定义环境变量方式*/
                REQUEST_PATH: JSON.stringify(options.requestPath ? options.requestPath :'/'),
            },
        })
    );

    const postcss = [
        rucksack(),
        autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
        }),
    ]

    return {
        entry,
        output,
        target: 'web',
        module,
        devtool: options.devtool,
        debug: options.debug,
        resolveLoader: {
            root: path.join(__dirname, 'node_modules'),
            alias: aliasLoader,
        },
        externals,
        resolve: {
            root: ROOT_PATH,
            modulesDirectories,
            extensions,
            alias,
        },
        plugins,
        webserverPort,
        postcss,
    }
};
