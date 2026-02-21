// stores/auth.store.ts
import { defineStore } from "pinia";
import type { AuthUser } from "~/types";

export const useAuthStore = defineStore(
  "auth",
  () => {
    // * State
    const user = ref<AuthUser | null>(null);
    const accessToken = ref("");

    // * Getters
    const moduleTypeList = computed(() => user.value?.moduleTypeList || []);
    const isLoggedIn = computed(() => !!user.value && !!accessToken.value);
    const fullName = computed(() => (user.value ? `${user.value.firstName} ${user.value.lastName}` : ""));
    const isSuperAdmin = computed(() => user.value?.isSuperAdmin === 1);

    // * Actions
    const setAuth = (newUser: AuthUser, token: string) => {
      user.value = newUser;
      accessToken.value = token;
    };

    const clearAuth = () => {
      user.value = null;
      accessToken.value = "";
    };

    return { user, accessToken, moduleTypeList, isLoggedIn, fullName, isSuperAdmin, setAuth, clearAuth };
  },
  { persist: true },
);
