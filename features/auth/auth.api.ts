// features/auth/auth.api.ts
import { api } from "~/plugins/api";
import type { LoginApiResponse, ProfileApiResponse } from "~/types";

export function useAuthApi() {
  return {
    login: (payload: any) => api.post<LoginApiResponse>("/auth/login", payload).then((r) => r.data),

    // * Returns the full user profile including moduleTypeList for permission checks
    getProfile: () => api.post<ProfileApiResponse>("/user/me").then((r) => r.data),
  };
}
