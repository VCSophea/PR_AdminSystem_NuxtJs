import { useAuthApi } from "~/features/auth/auth.api";

export default defineNuxtPlugin(async () => {
  if (import.meta.server) return;

  const authStore = useAuthStore();
  const tokenCookie = useCookie<string | null>("accessToken");
  const token = tokenCookie.value;

  // * No token — nothing to init, mark ready immediately
  if (authStore.isLoggedIn || !token) {
    authStore.authReady = true;
    return;
  }

  // * Seed store with token so the /user/me request is authenticated
  authStore.accessToken = token;

  try {
    const { body } = await useAuthApi().getProfile();
    if (body?.id) {
      authStore.setAuth(body, token);
    } else {
      // * /me returned unexpected data — clear session
      tokenCookie.value = null;
      authStore.clearAuth();
    }
  } catch {
    // * 401 or network error — clear session
    tokenCookie.value = null;
    authStore.clearAuth();
  } finally {
    // * Always signal that auth init has settled, regardless of outcome
    authStore.authReady = true;
  }
});
