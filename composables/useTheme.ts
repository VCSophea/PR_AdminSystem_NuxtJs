// composables/useTheme.ts
export function useTheme() {
  const isDark = useState("isDark", () => false);

  const applyTheme = () => {
    document.documentElement.classList.toggle("dark", isDark.value);
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
  };

  const toggleDark = () => {
    isDark.value = !isDark.value;
    applyTheme();
  };

  onMounted(() => {
    const saved = localStorage.getItem("theme");
    isDark.value = saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    applyTheme();
  });

  return { isDark, toggleDark };
}
