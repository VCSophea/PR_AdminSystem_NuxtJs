// composables/usePermission.ts
export function usePermission() {
  const authStore = useAuthStore();

  // * Check single permission
  const hasPermission = (moduleName: string, type = "VIEW"): boolean => {
    if (authStore.isSuperAdmin) return true;
    return !!authStore.moduleTypeList.find((m) => m.name === moduleName)?.moduleList.find((m) => m.type.toUpperCase() === type.toUpperCase())?.checked;
  };

  // * Check ANY of the given permissions
  const hasAnyPermission = (permissions: { module: string; type?: string }[]): boolean => authStore.isSuperAdmin || permissions.some((p) => hasPermission(p.module, p.type));

  // * Check ALL of the given permissions
  const hasAllPermissions = (permissions: { module: string; type?: string }[]): boolean => authStore.isSuperAdmin || permissions.every((p) => hasPermission(p.module, p.type));

  return { hasPermission, hasAnyPermission, hasAllPermissions };
}
