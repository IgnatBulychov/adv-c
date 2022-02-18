require('dotenv').config()

export default {
  target: 'static',
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt'
  ],
  buildModules: [
    [      
      '@nuxtjs/vuetify', {
      theme: {
        themes: {
          light: {
            primary: '#2b7fc8',
            secondary: '#6a95d4',
            accent: '#8c9eff',
            error: '#c72d2e',
          },
        },
      },
    }]
  ],
  plugins: [
    {src: '@/plugins/axios'},
    {src: '~/plugins/avatar-cropper', mode: 'client'},
  ],
  axios: {
    baseURL: process.env.SERVER_URL, // Used as fallback if no runtime config is provided
  },
  router: {
    middleware: [
      'main'
    ]
  },
}
