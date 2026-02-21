// stores/auth.store.ts
import { defineStore } from "pinia";
import type { AuthUser, ModuleType } from "~/types/permission.types";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as AuthUser | null,
    accessToken: "" as string,
  }),

  getters: {
    // Flat list of all 'type' values where checked === true
    permittedTypes: (state): string[] => {
      if (!state.user) return [];
      return state.user.moduleTypeList.flatMap((mt) => mt.moduleList.filter((m) => m.checked).map((m) => m.type));
    },

    moduleTypeList: (state): ModuleType[] => state.user?.moduleTypeList ?? [],

    isLoggedIn: (state): boolean => !!state.user && !!state.accessToken,

    fullName: (state): string => (state.user ? `${state.user.firstName} ${state.user.lastName}` : ""),
  },

  actions: {
    setAuth(user: AuthUser, token: string) {
      this.user = user;
      this.accessToken = token;
    },
    clearAuth() {
      this.user = null;
      this.accessToken = "";
    },
  },

  persist: true,
});
