// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  srcDir: ".",
  devtools: { enabled: true },
  typescript: { strict: true },

  modules: ["@primevue/nuxt-module", "@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-auth-utils"],

  primevue: {
    options: {
      theme: {
        preset: "Aura",
        options: {
          prefix: "p",
          darkModeSelector: ".dark",
          cssLayer: false,
        },
      },
    },
  },

  pinia: {
    storesDirs: ["./stores/**"],
  },

  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
});
