// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const publicRoutes = ["/login", "/403"];
  if (publicRoutes.includes(to.path)) return;

  const authStore = useAuthStore();

  // * On client-side refresh: wait for the auth.init plugin to finish /me
  // * before running any auth/permission checks — prevents false 403
  if (import.meta.client && !authStore.authReady) {
    await new Promise<void>((resolve) => {
      const stop = watch(
        () => authStore.authReady,
        (ready) => {
          if (ready) {
            stop();
            resolve();
          }
        },
        { immediate: true },
      );
    });
  }

  // * After init is settled, check auth
  const isAuth = authStore.isLoggedIn || !!useCookie("accessToken").value;
  if (!isAuth) return navigateTo("/login");
});
