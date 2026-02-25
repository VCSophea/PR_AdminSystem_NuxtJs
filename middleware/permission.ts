// middleware/permission.ts
export default defineNuxtRouteMiddleware((to) => {
  const { hasPermission, allowView, allowAdd, allowEdit, allowDelete, allowApprove, allowDisapprove, allowPick } = usePermission();
  const requiredModule = to.meta.requiredModule as string | undefined;

  // * Guard: skip if auth hasn't settled yet (prevents false 403 on refresh)
  // * auth.global.ts already awaits authReady, so this is a safety net
  if (!useAuthStore().authReady) return;

  // * Redirect to 403 if user lacks VIEW permission for this route's module
  if (requiredModule && !hasPermission(requiredModule, "VIEW")) {
    return navigateTo("/403");
  }
});
