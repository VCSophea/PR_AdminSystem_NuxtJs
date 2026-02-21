// middleware/permission.ts
export default defineNuxtRouteMiddleware((to) => {
  const { hasPermission } = usePermission();
  const requiredModule = to.meta.requiredModule as string | undefined;

  if (requiredModule && !hasPermission(requiredModule)) {
    return navigateTo("/403");
  }
});
