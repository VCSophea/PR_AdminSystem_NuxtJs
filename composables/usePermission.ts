export function usePermission() {
  const authStore = useAuthStore();

  // * Core Permission Checker
  const hasPermission = (moduleName: string, type = "VIEW"): boolean => {
    if (typeof type !== "string" || typeof moduleName !== "string") return false;
    const target = authStore.moduleTypeList?.find((m) => m?.name?.toLowerCase() === moduleName.toLowerCase());
    return target?.moduleList?.some((m) => m?.type?.toLowerCase() === type.toLowerCase() && m?.checked) ?? false;
  };

  // * Bulk Checkers
  const hasAnyPermission = (perms: { module: string; type?: string }[]) => perms.some((p) => hasPermission(p.module, p.type));
  const hasAllPermissions = (perms: { module: string; type?: string }[]) => perms.every((p) => hasPermission(p.module, p.type));

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,

    // * Action Shorthands
    allowView: (m: string) => hasPermission(m, "VIEW"),
    allowAdd: (m: string) => hasPermission(m, "ADD"),
    allowEdit: (m: string) => hasPermission(m, "EDIT"),
    allowDelete: (m: string) => hasPermission(m, "DELETE"),
    allowApprove: (m: string) => hasPermission(m, "APPROVE"),
    allowDisapprove: (m: string) => hasPermission(m, "DISAPPROVE"),
  };
}
