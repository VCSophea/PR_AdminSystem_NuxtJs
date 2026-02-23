// features/auth/auth.composable.ts
import { useAuthApi } from "./auth.api";

export function useAuth() {
  const authApi = useAuthApi();
  const authStore = useAuthStore();
  const tokenCookie = useCookie<string | null>("accessToken", { maxAge: 2591999 });
  const isLoading = ref(false);

  const login = async (credentials: Record<string, any>) => {
    isLoading.value = true;
    try {
      const payload = {
        ...credentials,
        deviceId: "web-client-id",
        deviceName: navigator.userAgent.substring(0, 50) || "Admin Web Client",
      };

      // * Login
      const { body: loginBody } = await authApi.login(payload);
      if (!loginBody?.accessToken) throw new Error("Invalid response format");

      // * Set token first so the Profile call has the Auth header
      authStore.accessToken = loginBody.accessToken;
      tokenCookie.value = loginBody.accessToken;

      // * Fetch Profile
      const { body: userProfile } = await authApi.getProfile();
      if (!userProfile?.id) throw new Error("Failed to load user profile");

      authStore.setAuth(userProfile, tokenCookie.value!);

      await navigateTo("/");
      return true;
    } catch (error: any) {
      console.error("Login component error:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    authStore.clearAuth();
    tokenCookie.value = null;
    navigateTo("/login");
  };

  return { login, logout, isLoading };
}
