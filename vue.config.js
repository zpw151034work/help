'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title || '资源服务市场' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
    // 打包
    // publicPath: '/skillmarket/front',
    // 开发环境
    // assetsPublicPath: './',
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    // lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port: port,
        open: false,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            // '/api': {
            //   target: 'https://mrpa-dev.ai-rtc.com:8082/plat',
            //   changeOrigin: true,
            //   pathRewrite: {
            //     '^/api': ''
            //   }
            // }
            // change xxx-api/login => mock/login
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            '/api': {
                // 开发环境
                // target: 'http://139.129.164.252:9530/',
                // target: 'http://122.9.138.143:9531/',
                // target: 'https://mrpa-dev.ai-rtc.com:8082/plat/',
                target: 'https://mrpa-poc.ai-rtc.com:9530/rpa/plat/api/',
                // target: 'https://127.0.0.1:8088',
                // 打包
                // target: 'http://120.92.50.188:9081/',
                // target: 'http://127.0.0.1:9531/',
                // target: 'http://139.129.164.252:9530/',
                // target: 'https://mrpa-test.ai-rtc.com:8082/plat/api',//开发
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
        // after: require('./mock/mock-server.js')
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    configureWebpack: {
        module: {
          rules: [
            {
              test: /\.md$/,
              use: ["text-loader"]
            }
          ]
        }
      },
    
    chainWebpack(config) {
        config.plugins.delete('preload') // TODO: need test
        config.plugins.delete('prefetch') // TODO: need test

        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

        // set preserveWhitespace
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()

        config
        // https://webpack.js.org/configuration/devtool/#development
            .when(process.env.NODE_ENV === 'development',
            config => config.devtool('cheap-source-map')
        )

        config
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config
                        .plugin('ScriptExtHtmlWebpackPlugin')
                        .after('html')
                        .use('script-ext-html-webpack-plugin', [{
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            inline: /runtime\..*\.js$/
                        }])
                        .end()
                    config
                        .optimization.splitChunks({
                            chunks: 'all',
                            cacheGroups: {
                                libs: {
                                    name: 'chunk-libs',
                                    test: /[\\/]node_modules[\\/]/,
                                    priority: 10,
                                    chunks: 'initial' // only package third parties that are initially dependent
                                },
                                elementUI: {
                                    name: 'chunk-elementUI', // split elementUI into a single package
                                    priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                                },
                                commons: {
                                    name: 'chunk-commons',
                                    test: resolve('src/components'), // can customize your rules
                                    minChunks: 3, //  minimum common number
                                    priority: 5,
                                    reuseExistingChunk: true
                                }
                            }
                        })
                    config.optimization.runtimeChunk('single')
                }
            )
        config.plugin('define').tap(definitions => {
            Object.assign(definitions[0]['process.env'], {
                "VERSION": JSON.stringify(process.env.npm_package_version)
            });
            return definitions;
        })
    }
}