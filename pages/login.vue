<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import { useAuth } from "~/features/auth/auth.composable"
import { createLoginSchema } from "~/utils/shared/schemas"

definePageMeta({ layout: "auth" })
const { t } = useI18n()

const schema = toTypedSchema(createLoginSchema(t))

const { handleSubmit, isSubmitting } = useForm({ validationSchema: schema })
const { login: executeLogin } = useAuth()
const loginError = ref("")

const onSubmit = handleSubmit(async (values) => {
  loginError.value = ""
  try {
    await executeLogin(values)
  } catch (error: any) {
    const backendMessage =
      error?.response?.data?.body?.message || error?.response?.data?.message || error?.message
    loginError.value = backendMessage || "Invalid username or password"
  }
})
</script>

<template>
  <div class="login-card">
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">{{ $t("welcome") }}</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ $t("login_subtitle") }}</p>
    </div>

    <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
      <AppFormField
        name="username"
        :label="$t('username')"
        required
        :placeholder="$t('placeholder_username')"
        icon="pi pi-user"
        glass
      />
      <AppFormField
        name="password"
        type="password"
        :label="$t('password')"
        required
        :placeholder="$t('placeholder_password')"
        icon="pi pi-lock"
        glass
      />

      <div v-if="loginError" class="error-banner">
        <i class="pi pi-exclamation-circle text-sm shrink-0"></i>
        <span class="text-xs font-semibold leading-tight">{{ loginError }}</span>
      </div>

      <button type="submit" :disabled="isSubmitting" class="login-btn mt-1">
        <i v-if="isSubmitting" class="pi pi-spin pi-spinner mr-2"></i>
        {{ $t("login_button") }}
      </button>
    </form>

    <div class="mt-6 text-center text-[11px] text-gray-400 dark:text-gray-500">
      <p>
        {{ $t("powered_by") }}
        <span class="font-semibold text-gray-500 dark:text-gray-400"
          >UDAYA TECHNOLOGY Co., Ltd.</span
        >
      </p>
      <p class="mt-0.5">{{ $t("version") }} 1.08</p>
    </div>
  </div>
</template>

<style scoped>
.login-card {
  padding: 2rem;
  border-radius: 1.25rem;
  background: var(--glass-bg);
  backdrop-filter: blur(18px);
  border: 1px solid var(--glass-border);
  box-shadow:
    var(--glass-card-shadow),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: background 0.3s ease;
}

.error-banner {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: var(--color-error);
  backdrop-filter: blur(4px);
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background: var(--color-accent);
  color: #fff;
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(0, 143, 57, 0.4);
  transition:
    background 0.2s,
    transform 0.1s;
}
.login-btn:hover {
  background: var(--color-accent-hover);
}
.login-btn:active {
  transform: scale(0.98);
}
.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
