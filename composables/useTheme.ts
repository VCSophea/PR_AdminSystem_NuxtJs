// composables/useTheme.ts
export function useTheme() {
  const isDark = ref(false);

  const applyTheme = () => {
    document.documentElement.classList.toggle("dark", isDark.value);
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
  };

  const initTheme = () => {
    const saved = localStorage.getItem("theme");
    isDark.value = saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    applyTheme();
  };

  const toggleDark = () => {
    isDark.value = !isDark.value;
    applyTheme();
  };

  onMounted(() => initTheme());

  return { isDark, toggleDark };
}
