// composables/useApi.ts
import axios from "axios";
import { useAuthStore } from "~/stores/auth.store";

export function useApi() {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  const router = useRouter();

  const api = axios.create({
    baseURL: config.public.apiBase,
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
  });

  // Auto-attach JWT to every request
  api.interceptors.request.use((req) => {
    if (authStore.accessToken) {
      req.headers.Authorization = `Bearer ${authStore.accessToken}`;
    }
    return req;
  });

  // Handle 401 — token expired → logout + redirect
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error.response?.status === 401) {
        authStore.clearAuth();
        await router.push("/login");
      }
      return Promise.reject(error);
    },
  );

  return { api };
}
