module.exports = {
  mode: 'spa',
  head: {
    title: 'Barks',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'BackOffice Online' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type:'text/css',
        href: './assets/fonts/Roboto-Black.ttf'
      },
      {
        rel: 'stylesheet',
        type:'text/css',
        href: './assets/fonts/Roboto-BlackItalic.ttf'
      },
      {
        rel: 'stylesheet',
        type:'text/css',
        href: './assets/fonts/Roboto-Bold.ttf'
      },
      {
        rel: 'stylesheet',
        type:'text/css',
        href: './assets/fonts/Roboto-BoldItalic.ttf'
      },
      {
        rel: 'stylesheet',
        type:'text/css',
        href: './assets/fonts/Roboto-Italic.ttf'
      },
      {
        rel: 'stylesheet',
        type:'text/css',
        href: './assets/fonts/Roboto-Light.ttf'
      },
      {
        rel: 'stylesheet',
        type:'text/css',
        href: './assets/fonts/Roboto-LightItalic.ttf'
      },
      {
        rel: 'stylesheet',
        type:'text/css',
        href: './assets/fonts/Roboto-Medium.ttf'
      },
      {
        rel: 'stylesheet',
        type:'text/css',
        href: './assets/fonts/Roboto-MediumItalic.ttf'
      },
      {
        rel: 'stylesheet',
        type:'text/css',
        href: './assets/fonts/Roboto-Regular.ttf'
      },
      {
        rel: 'stylesheet',
        type:'text/css',
        href: './assets/fonts/Roboto-Thin.ttf'
      },
      {
        rel: 'stylesheet',
        type:'text/css',
        href: './assets/fonts/Roboto-ThinItalic.ttf'
      }
    ]
  },
  loading: false, // Disable default loading bar
  dev: process.env.NODE_ENV === 'DEV',
  plugins: ['~/plugins/vuetify.js'],
  css: ['~/assets/style/app.styl'],
  build: {
    extractCSS: true,
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        // Run ESLint on save
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      // Extend only webpack config for client-bundle
      if (isClient) { config.target = 'electron-renderer' }
    }
  }
}
