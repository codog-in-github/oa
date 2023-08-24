module.exports = {
    outputDir: '../oa-interface/Public/index/',
    publicPath: process.env.NODE_ENV === 'production' ? '/Public/index/' : '/',
    lintOnSave: false,
    configureWebpack: {
        devtool: 'source-map'
    },
    devServer: {
        proxy: process.env.PROXY
    }
}
