// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  const publicRoutes = ["/login", "/403"];
  if (publicRoutes.includes(to.path)) return;

  // * Redirect unauthenticated users to login
  if (!authStore.isLoggedIn) return navigateTo("/login");
});
