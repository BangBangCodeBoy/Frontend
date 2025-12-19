<!-- src/features/problem-set/ui/ProblemCategoryFilter.vue -->
<script setup lang="ts">
import {
  categoryList,
  categoryLabelMap,
  type FilterCategory,
} from "@/features/problem-set/model/filterCategory";

const props = defineProps<{
  modelValue: FilterCategory;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: FilterCategory): void;
}>();

const handleClick = (cat: FilterCategory) => {
  emit("update:modelValue", cat);
};
</script>

<template>
  <div class="flex items-center justify-end gap-2">
    <button
      v-for="cat in categoryList"
      :key="cat"
      type="button"
      class="rounded-full border px-3 py-1 text-xs transition-colors"
      :class="
        props.modelValue === cat
          ? 'border-primary-500 bg-primary-50 text-primary-600'
          : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
      "
      @click="handleClick(cat)"
    >
      {{ categoryLabelMap[cat] }}
    </button>
  </div>
</template>
