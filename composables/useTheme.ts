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
    // * Default is light; only switch to dark if user previously chose dark
    isDark.value = localStorage.getItem("theme") === "dark";
    applyTheme();
  });

  return { isDark, toggleDark };
}
