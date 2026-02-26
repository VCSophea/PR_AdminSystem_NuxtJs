<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps<{
  name?: string;
  modelValue?: any;
  label?: string;
  required?: boolean;
  type?: string;
  icon?: string;
  placeholder?: string;
  options?: any[];
  optionLabel?: string;
  optionValue?: string;
  rows?: number;
}>();

const emit = defineEmits(["update:modelValue"]);
const { t } = useI18n();

// * Field Sync
const field = props.name ? useField<any>(() => props.name!) : null;
const model = computed({
  get: () => (field ? field.value.value : props.modelValue),
  set: (v) => (field ? (field.value.value = v) : emit("update:modelValue", v)),
});

// * Component Logic
const component = computed(() => {
  const map: Record<string, string> = { textarea: "Textarea", password: "Password", select: "Select", date: "DatePicker" };
  return map[props.type || ""] || "InputText";
});

// * Reactive Bindings
const bindings = computed(() => {
  const { modelValue: _, placeholder: __, ...rest } = props;
  return {
    id: props.name,
    modelValue: model.value,
    "onUpdate:modelValue": (v: any) => (model.value = v),
    invalid: !!field?.errorMessage.value,
    placeholder: props.placeholder || t("enter"),
    fluid: true,
    rounded: "large",
    class: "w-full",
    ...(props.type === "textarea" ? { rows: props.rows ?? 3, autoResize: true } : {}),
    ...(props.type === "password" ? { feedback: false, toggleMask: true } : {}),
    ...(props.type === "select" ? { options: props.options, optionLabel: props.optionLabel, optionValue: props.optionValue, placeholder: props.placeholder || t("select") } : {}),
    ...(props.type === "date" ? { dateFormat: "yy-mm-dd", showIcon: true, iconDisplay: "input", placeholder: props.placeholder || t("select") } : {}),
    ...rest,
  };
});
</script>

<template>
  <div class="flex flex-col gap-1 w-full relative">
    <component :is="label ? 'FloatLabel' : 'div'" :variant="label ? 'on' : undefined" class="w-full">
      <IconField v-if="icon" class="w-full">
        <InputIcon>
          <Icon v-if="icon.includes(':')" :name="icon" class="text-[1.1rem]" />
          <i v-else :class="[icon, 'text-sm']" />
        </InputIcon>
        <component :is="component" v-bind="bindings" />
      </IconField>

      <component v-else :is="component" v-bind="bindings" />

      <!-- * Label Rendering -->
      <label v-if="label" :for="name" class="text-zinc-500"> {{ label }}<span v-if="required" class="text-red-500"> *</span> </label>
    </component>

    <!-- * Error Message -->
    <small v-if="field?.errorMessage.value" class="text-[0.72rem] font-medium text-red-500 mt-0.5">
      {{ field.errorMessage.value }}
    </small>
  </div>
</template>
