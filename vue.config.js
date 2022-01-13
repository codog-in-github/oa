module.exports = {
    outputDir: '../oa-interface/Public/index/',
    publicPath: process.env.NODE_ENV === 'production' ? '/Public/index/' : '/',
    configureWebpack: {
        devtool: 'source-map'
    }
}
