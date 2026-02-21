// middleware/permission.ts
export default defineNuxtRouteMiddleware((to) => {
  const { hasPermission } = usePermission();
  const requiredModule = to.meta.requiredModule as string | undefined;

  // * Redirect to 403 if user lacks VIEW permission for this route's module
  if (requiredModule && !hasPermission(requiredModule, "VIEW")) {
    return navigateTo("/403");
  }
});
