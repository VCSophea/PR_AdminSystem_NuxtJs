// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  const publicRoutes = ["/login", "/403"];
  if (publicRoutes.includes(to.path)) return;

  if (!authStore.isLoggedIn) {
    return navigateTo("/login");
  }
});
