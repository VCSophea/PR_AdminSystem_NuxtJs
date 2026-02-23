// stores/auth.store.ts
import { defineStore } from "pinia";
import type { AuthUser } from "~/utils/types";

export const useAuthStore = defineStore("auth", () => {
  // * State
  const user = ref<AuthUser | null>(null);
  const accessToken = ref("");

  // * True once the /me init call has resolved (success or failure)
  // * Middleware waits for this before running permission checks on refresh
  const authReady = ref(false);

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

  return { user, accessToken, authReady, moduleTypeList, isLoggedIn, fullName, isSuperAdmin, setAuth, clearAuth };
});
