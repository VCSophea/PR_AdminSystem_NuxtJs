<!-- pages/login.vue -->
<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

definePageMeta({ layout: "auth" });

const schema = toTypedSchema(
  z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
  }),
);

const { handleSubmit, errors, isSubmitting } = useForm({ validationSchema: schema });
const { value: username } = useField<string>("username");
const { value: password } = useField<string>("password");

const authStore = useAuthStore();
const { api } = useApi();
const router = useRouter();
const toast = useToast();

const onSubmit = handleSubmit(async (values) => {
  try {
    // 1. Login to get token
    const loginRes = await api.post("/auth/login", values);
    const token = loginRes.data.body.accessToken;

    // 2. Call /me with the token
    const meRes = await api.get("/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // 3. Save to Pinia (persisted)
    authStore.setAuth(meRes.data.body, token);

    // 4. Go to dashboard
    await router.push("/");
  } catch (err) {
    // We will use standard alert or PrimeVue toast context if available
    alert("Login Failed: Invalid username or password");
  }
});
</script>

<template>
  <div class="w-full max-w-md p-8 bg-[var(--surface-card)] rounded-2xl shadow-lg">
    <div class="flex justify-center mb-6">
      <img src="~/assets/images/logo.webp" alt="Logo" class="h-12" />
    </div>
    <h1 class="text-2xl font-bold text-center mb-8 text-[var(--text-primary)]">Sign In</h1>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-5">
      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-[var(--text-secondary)]">Username</label>
        <InputText v-model="username" placeholder="Enter username" :invalid="!!errors.username" class="w-full" />
        <small class="text-red-500" v-if="errors.username">{{ errors.username }}</small>
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-[var(--text-secondary)]">Password</label>
        <Password v-model="password" placeholder="Enter password" :feedback="false" toggleMask :invalid="!!errors.password" class="w-full" />
        <small class="text-red-500" v-if="errors.password">{{ errors.password }}</small>
      </div>
      <Button type="submit" label="Sign In" :loading="isSubmitting" class="w-full mt-2" />
    </form>
  </div>
</template>
