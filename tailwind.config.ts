export default {
  darkMode: "class",
  content: ["./components/**/*.vue", "./pages/**/*.vue", "./features/**/*.vue", "./layouts/**/*.vue", "./app.vue", "./error.vue"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--brand-primary)",
          accent: "var(--brand-accent)",
          sidebar: "var(--brand-sidebar-bg)",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
};
