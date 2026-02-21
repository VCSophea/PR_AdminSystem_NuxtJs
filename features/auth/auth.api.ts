// features/auth/auth.api.ts
import { api } from "~/plugins/api";
import type { ApiResponse, AuthUser } from "~/types";
import type { LoginResponse } from "./auth.types";

export function useAuthApi() {
  return {
    login: (payload: any) => api.post<ApiResponse<LoginResponse>>("/auth/login", payload).then((r) => r.data),

    // * Returns the full user profile including moduleTypeList for permission checks
    getProfile: () => api.post<ApiResponse<AuthUser>>("/user/me").then((r) => r.data),
  };
}
