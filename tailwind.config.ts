export default {
  darkMode: "class",
  content: ["./components/**/*.vue", "./pages/**/*.vue", "./features/**/*.vue", "./layouts/**/*.vue"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--brand-primary)",
          accent: "var(--brand-accent)",
          sidebar: "var(--brand-sidebar-bg)",
        },
      },
    },
  },
};
