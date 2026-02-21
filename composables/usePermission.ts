// composables/usePermission.ts
import { useAuthStore } from "~/stores/auth.store";

export function usePermission() {
  const authStore = useAuthStore();

  // Check single permission by 'type' from moduleList
  const hasPermission = (type: string): boolean => {
    return authStore.permittedTypes.includes(type);
  };

  // Check if user has ANY of the listed types
  const hasAnyPermission = (...types: string[]): boolean => {
    return types.some((t) => authStore.permittedTypes.includes(t));
  };

  // Check if user has ALL of the listed types
  const hasAllPermissions = (...types: string[]): boolean => {
    return types.every((t) => authStore.permittedTypes.includes(t));
  };

  return { hasPermission, hasAnyPermission, hasAllPermissions };
}
