// plugins/api.ts
import axios from "axios";

const api = axios.create({
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export default defineNuxtPlugin(() => {
  api.defaults.baseURL = useRuntimeConfig().public.apiBase;

  // * Inject Bearer token - falls back to cookie when store is not yet hydrated
  api.interceptors.request.use((req) => {
    const token = useAuthStore().accessToken || useCookie<string | null>("accessToken").value || "";
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
  });

  // * Auto-logout on 401
  api.interceptors.response.use(null, async (err) => {
    if (err.response?.status === 401) {
      useAuthStore().clearAuth();
      await navigateTo("/login");
    }
    return Promise.reject(err);
  });
});

export { api };
