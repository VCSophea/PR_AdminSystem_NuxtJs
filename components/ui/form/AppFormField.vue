<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps<{
  name: string;
  label?: string;
  required?: boolean;
  glass?: boolean;
  type?: "text" | "password" | "email" | "number" | "select" | "date" | "textarea";
  placeholder?: string;
  icon?: string;
  iconPosition?: "left" | "right";
  options?: any[];
  optionLabel?: string;
  optionValue?: string;
  rows?: number;
}>();

const { value, errorMessage } = useField<any>(() => props.name);
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" :for="name" :class="['field-label', glass ? 'text-white' : 'text-gray-600 dark:text-gray-300']"> {{ label }} <span v-if="required" :class="glass ? 'text-red-300' : 'text-red-500'">*</span> </label>

    <!-- * Input Wrapper — controls deep styles via scoped class -->
    <div class="input-wrapper relative w-full" :class="[type === 'password' ? 'pw-wrapper' : '', glass ? 'skin-glass' : 'skin-normal']">
      <!-- Left Icon -->
      <i v-if="icon && iconPosition === 'left'" :class="[icon, 'icon-left absolute left-3 top-1/2 -translate-y-1/2 text-sm z-10 pointer-events-none']"> </i>

      <!-- Text / Email / Number -->
      <InputText v-if="type === 'text' || type === 'email' || type === 'number' || !type" :id="name" v-model="value" :type="type || 'text'" :placeholder="placeholder" :invalid="!!errorMessage" class="input-el" :class="{ 'has-icon-left': icon && iconPosition === 'left', 'has-icon-right': icon && iconPosition === 'right' }" />

      <!-- Textarea -->
      <Textarea v-else-if="type === 'textarea'" :id="name" v-model="value" :placeholder="placeholder" :rows="rows || 3" :invalid="!!errorMessage" autoResize class="input-el" />

      <!-- Password -->
      <Password v-else-if="type === 'password'" :id="name" v-model="value" :placeholder="placeholder" :feedback="false" toggleMask :invalid="!!errorMessage" class="w-full" />

      <!-- Select -->
      <Select v-else-if="type === 'select'" :id="name" v-model="value" :options="options" :optionLabel="optionLabel" :optionValue="optionValue" :placeholder="placeholder" :invalid="!!errorMessage" class="w-full input-el" />

      <!-- DatePicker -->
      <DatePicker v-else-if="type === 'date'" :id="name" v-model="value" :placeholder="placeholder" :invalid="!!errorMessage" dateFormat="yy-mm-dd" showIcon iconDisplay="input" class="w-full" />

      <!-- Right Icon -->
      <i v-if="icon && iconPosition === 'right' && type !== 'password' && type !== 'date'" :class="[icon, 'icon-right absolute right-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none']"> </i>
    </div>

    <small :class="['text-xs font-medium', glass ? 'text-red-300' : 'text-red-500']" v-if="errorMessage">
      {{ errorMessage }}
    </small>
  </div>
</template>

<style scoped>
/* ===== Label ===== */
.field-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* ===== Shared input core ===== */
.input-wrapper :deep(.input-el),
.input-wrapper :deep(.p-inputtext),
.input-wrapper :deep(input:not([type="checkbox"])) {
  width: 100%;
  padding: 0.6rem 0.875rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  border-width: 1px;
  border-style: solid;
  outline: none;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
  box-shadow: none;
}

/* === Normal skin === */
.skin-normal :deep(.input-el),
.skin-normal :deep(.p-inputtext),
.skin-normal :deep(input:not([type="checkbox"])) {
  background: #ffffff;
  border-color: #d1d5db;
  color: #111827;
}
.skin-normal :deep(.input-el::placeholder),
.skin-normal :deep(.p-inputtext::placeholder),
.skin-normal :deep(input::placeholder) {
  color: #9ca3af;
}
.skin-normal :deep(.input-el:focus),
.skin-normal :deep(.p-inputtext:focus),
.skin-normal :deep(input:focus) {
  border-color: #008f39;
  box-shadow: 0 0 0 2px rgba(0, 143, 57, 0.15);
}

/* === Glass skin === */
.skin-glass :deep(.input-el),
.skin-glass :deep(.p-inputtext),
.skin-glass :deep(input:not([type="checkbox"])) {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.45);
  color: #ffffff;
}
.skin-glass :deep(.input-el::placeholder),
.skin-glass :deep(.p-inputtext::placeholder),
.skin-glass :deep(input::placeholder) {
  color: rgba(255, 255, 255, 0.55);
}
.skin-glass :deep(.input-el:focus),
.skin-glass :deep(.p-inputtext:focus),
.skin-glass :deep(input:focus) {
  border-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
}

/* === Icon offsets === */
.input-wrapper :deep(.has-icon-left) {
  padding-left: 2.25rem;
}
.input-wrapper :deep(.has-icon-right) {
  padding-right: 2.25rem;
}
.icon-left {
  color: #9ca3af;
}
.skin-glass .icon-left {
  color: rgba(255, 255, 255, 0.7);
}
.icon-right {
  color: #9ca3af;
}
.skin-glass .icon-right {
  color: rgba(255, 255, 255, 0.7);
}

/* === Password wrapper === */
.pw-wrapper :deep(.p-password) {
  width: 100%;
  position: relative;
}
.pw-wrapper :deep(.p-password svg) {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 1rem;
  height: 1rem;
  color: #9ca3af;
}
.pw-wrapper.skin-glass :deep(.p-password svg) {
  color: rgba(255, 255, 255, 0.65);
}

/* === Select padding === */
:deep(.p-select .p-select-label) {
  padding: 0.6rem 0.875rem;
  font-size: 0.875rem;
}

/* === DatePicker icon === */
:deep(.p-datepicker-input-icon) {
  right: 0.75rem;
  width: 1rem;
  height: 1rem;
  color: #9ca3af;
}
</style>
