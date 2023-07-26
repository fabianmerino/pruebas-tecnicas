// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Reading List App',
    },
  },
  modules: ['@vueuse/nuxt', '@nuxthq/ui'],
  devtools: { enabled: true },
  ui: {
    icons: ['mdi', 'heroicons'],
  },
})
