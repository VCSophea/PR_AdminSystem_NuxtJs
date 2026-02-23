// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  srcDir: ".",
  devtools: { enabled: true },
  typescript: { strict: true },
  devServer: {
    port: 3005,
    host: "localhost", // 0.0.0.0 for shared
  },

  app: {
    head: {
      titleTemplate: "%s - Nuxt Admin System",
      title: "Dashboard",
      meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1" }, { name: "description", content: "Nuxt 3 Admin Backend System" }, { name: "theme-color", content: "#0f172a" }],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },

  modules: ["@primevue/nuxt-module", "@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-auth-utils", "@nuxtjs/i18n", "@nuxt/icon", "@nuxtjs/google-fonts"],

  googleFonts: {
    families: {
      "Kantumruy Pro": [400, 700],
    },
    display: "swap",
  },

  i18n: {
    locales: [
      { code: "en", language: "en-US", file: "en.json", name: "English" },
      { code: "km", language: "km-KH", file: "km.json", name: "ខ្មែរ" },
    ],
    langDir: "locales/",
    defaultLocale: "en",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      fallbackLocale: "en",
    },
  },

  primevue: {
    autoImport: true,
    importTheme: { from: "@/themes/preset" },
  },

  pinia: {
    storesDirs: ["./stores/**"],
  },

  imports: {
    // * Auto-import nested directories
    dirs: ["composables/**", "features/**", "utils/**"],
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
