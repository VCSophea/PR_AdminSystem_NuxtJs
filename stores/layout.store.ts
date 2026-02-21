// stores/layout.store.ts
import { defineStore } from "pinia";

export const useLayoutStore = defineStore("layout", () => {
  const isSidebarCollapsed = ref(false);

  const toggleSidebar = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
  };

  const setSidebar = (state: boolean) => {
    isSidebarCollapsed.value = state;
  };

  return { isSidebarCollapsed, toggleSidebar, setSidebar };
});
