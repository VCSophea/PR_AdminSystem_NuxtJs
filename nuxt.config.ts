// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  srcDir: ".",
  devtools: { enabled: true },
  typescript: { strict: true },
  devServer: {
    port: 3005,
    host: "localhost",
  },

  modules: ["@primevue/nuxt-module", "@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-auth-utils", "@nuxtjs/i18n", "@nuxt/icon"],

  i18n: {
    locales: [
      { code: "en", language: "en-US", file: "en.json", name: "English" },
      { code: "km", language: "km-KH", file: "km.json", name: "ខ្មែរ" },
    ],
    defaultLocale: "en",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      fallbackLocale: "en",
    },
  },

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

  imports: {
    dirs: ["composables/**", "features/**"],
  },

  components: [
    { path: "~/components", pathPrefix: false },
    { path: "./features", pathPrefix: false },
  ],

  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
});
