<script setup lang="ts">
import { useField } from "vee-validate";
import { computed } from "vue";

const props = defineProps<{
  name: string;
  label: string;
  required?: boolean;
  glass?: boolean;
  type?: "text" | "password" | "email" | "number" | "textarea" | "select" | "date";
  icon?: string;
  options?: any[];
  optionLabel?: string;
  optionValue?: string;
  rows?: number;
}>();

const { value, errorMessage } = useField<string>(() => props.name);

// * Model Sync
const model = computed({
  get: () => value.value ?? "",
  set: (v) => (value.value = v),
});

// * Resolve Component
const component = computed(
  () =>
    (
      ({
        textarea: "Textarea",
        password: "Password",
        select: "Select",
        date: "DatePicker",
      }) as Record<string, string>
    )[props.type ?? ""] || "InputText",
);

// * Dynamic Bindings
const bindings = computed(() => {
  const type = props.type || "text";
  return {
    id: props.name,
    modelValue: model.value,
    "onUpdate:modelValue": (v: any) => (model.value = v),
    invalid: !!errorMessage.value,
    fluid: true,
    class: "w-full",
    ...((
      {
        textarea: { rows: props.rows ?? 3, autoResize: true },
        password: { feedback: false, toggleMask: true },
        select: { options: props.options, optionLabel: props.optionLabel, optionValue: props.optionValue },
        date: { dateFormat: "yy-mm-dd", showIcon: true, iconDisplay: "input" },
      } as Record<string, any>
    )[type] || { type }),
  };
});
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <FloatLabel variant="on" class="w-full" :class="glass ? 'skin-glass' : 'skin-normal'">
      <IconField v-if="icon" class="w-full">
        <InputIcon>
          <Icon v-if="icon.includes(':')" :name="icon" class="text-[1.05rem]" />
          <i v-else :class="[icon, 'text-sm']" />
        </InputIcon>
        <component :is="component" v-bind="bindings" />
      </IconField>

      <component v-else :is="component" v-bind="bindings" />

      <label :for="name" :class="glass ? 'text-white/80' : ''"> {{ label }}<span v-if="required" :class="glass ? 'text-red-300' : 'text-red-500'"> *</span> </label>
    </FloatLabel>

    <small v-if="errorMessage" class="text-[0.72rem] font-medium" :class="glass ? 'text-red-300' : 'text-red-500'">
      {{ errorMessage }}
    </small>
  </div>
</template>

<style scoped>
/* Label sits on border — must match input bg to cut through border line cleanly */
:deep(.p-floatlabel label) {
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  padding: 0 0.25rem;
  line-height: 1;
}

/* Shared input sizing */
:deep(.p-inputtext),
:deep(.p-textarea),
:deep(input:not([type="checkbox"])) {
  width: 100%;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  border: 1px solid;
  outline: none;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}

/* PrimeVue icon margin override */
:deep(.p-inputicon) {
  margin-top: -0.5rem;
}
:deep(.p-iconfield .p-inputtext) {
  padding-left: 2.5rem !important;
}
:deep(.p-iconfield:has(.p-inputicon) .p-inputtext) {
  padding-left: 2.5rem !important;
}
:deep(.p-iconfield) {
  width: 100%;
}

:deep(.p-inputtext:not(.p-iconfield .p-inputtext)),
:deep(.p-textarea),
:deep(input:not([type="checkbox"])) {
  padding: 0.75rem 0.875rem;
}

:deep(.p-password) {
  width: 100%;
}
:deep(.p-password-input) {
  width: 100%;
  padding: 0.75rem 2.875rem 0.75rem 0.875rem !important;
}

/* Normal skin */
.skin-normal :deep(.p-inputtext),
.skin-normal :deep(.p-textarea),
.skin-normal :deep(input:not([type="checkbox"])) {
  background: #fff;
  border-color: #d1d5db;
  color: #111827;
}
.skin-normal :deep(.p-floatlabel label) {
  color: #6b7280;
  background: #fff;
}
.skin-normal :deep(.p-inputtext:focus),
.skin-normal :deep(.p-textarea:focus),
.skin-normal :deep(input:focus) {
  border-color: #008f39;
  box-shadow: 0 0 0 2px rgba(0, 143, 57, 0.15);
}

/* Dark mode */
:global(.dark) .skin-normal :deep(.p-inputtext),
:global(.dark) .skin-normal :deep(.p-textarea),
:global(.dark) .skin-normal :deep(input:not([type="checkbox"])) {
  background: #18181b;
  border-color: #3f3f46;
  color: #f4f4f5;
}
:global(.dark) .skin-normal :deep(.p-floatlabel label) {
  background: #18181b;
  color: #a1a1aa;
}

/* Glass skin */
.skin-glass :deep(.p-inputtext),
.skin-glass :deep(.p-textarea),
.skin-glass :deep(input:not([type="checkbox"])) {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.45);
  color: #fff;
}
.skin-glass :deep(.p-floatlabel label) {
  color: rgba(255, 255, 255, 0.8);
  background: transparent;
}
/* * Important block */
.skin-glass :deep(:is(.p-inputtext, .p-textarea, input):focus) {
  border-color: rgba(255, 255, 255, 0.9) !important;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2) !important;
}
.skin-glass :deep(.p-inputicon),
.skin-glass :deep(.p-password svg) {
  color: rgba(255, 255, 255, 0.75);
}
</style>
