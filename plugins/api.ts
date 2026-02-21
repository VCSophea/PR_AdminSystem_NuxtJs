// plugins/api.ts
import axios from "axios";

// * Create instance at module level (no composables here)
const api = axios.create({
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export default defineNuxtPlugin(() => {
  // * Set baseURL from runtimeConfig (only valid inside plugin)
  api.defaults.baseURL = useRuntimeConfig().public.apiBase;

  // * Attach JWT token to every request
  api.interceptors.request.use((req) => {
    const { accessToken } = useAuthStore();
    if (accessToken) req.headers.Authorization = `Bearer ${accessToken}`;
    return req;
  });

  // * Redirect to login on 401 Unauthorized
  api.interceptors.response.use(
    (res) => res,
    async (err) => {
      if (err.response?.status === 401) {
        useAuthStore().clearAuth();
        await navigateTo("/login");
      }
      return Promise.reject(err);
    },
  );
});

export { api };
