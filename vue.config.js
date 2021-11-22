module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  devServer: {
    proxy: 'https://dummy-api.handysolver.com/'
  }
}
