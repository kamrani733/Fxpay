export default defineNuxtConfig({
  compatibilityDate: '2026-08-20',
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      ignore: ['**/*.ts'],
    },
  ],
  shadcn: {
    prefix: 'Ui',
    componentDir: './components/ui',
  },
  typescript: {
    strict: true,
  },
});
