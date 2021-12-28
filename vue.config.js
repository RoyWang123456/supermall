module.exports = {
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'content': 'components/content',
        'common': 'components/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views'
      }
    }
  }
}
