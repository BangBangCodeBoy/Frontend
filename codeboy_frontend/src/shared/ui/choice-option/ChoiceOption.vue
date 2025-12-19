<!-- src/shared/ui/choice-option/ChoiceOption.vue -->
<script setup lang="ts">
const props = defineProps<{
  text: string;
  variant?: "default" | "selected" | "correct" | "incorrect";
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "click"): void;
}>();

const onClick = () => {
  if (props.disabled) return;
  emit("click");
};
</script>

<template>
  <button
    type="button"
    class="w-full text-left px-4 py-3 rounded-lg border transition-colors Body2"
    :class="[
      variant === 'selected' &&
        'bg-secondary-50 border-secondary-400 text-secondary-800',
      variant === 'correct' && 'bg-green-50 border-green-500 text-green-800',
      variant === 'incorrect' && 'bg-red-50 border-red-500 text-red-800',
      (!variant || variant === 'default') &&
        'bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50',
      disabled && 'cursor-not-allowed opacity-70',
    ]"
    @click="onClick"
  >
    {{ text }}
  </button>
</template>
