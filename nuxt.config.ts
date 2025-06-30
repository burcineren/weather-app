// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/css/tailwind.css'],
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      openweatherApiKey: process.env.OPENWEATHER_API_KEY,
    },
  },

})
