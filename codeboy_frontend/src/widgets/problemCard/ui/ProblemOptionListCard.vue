<!-- src/widgets/realtime-question-card/ui/RealtimeQuestionCard.vue -->
<script setup lang="ts">
import { ref } from "vue";
import type { ChoiceQuestion } from "@/entities/question/model/question.types";
import ChoiceOption from "@/shared/ui/choice-option/ChoiceOption.vue";

const props = defineProps<{
  question: ChoiceQuestion;
  disabled?: boolean; // 특정 시간 이후 선택 못하게 막고 싶을 때 사용
}>();

const emit = defineEmits<{
  (e: "select", payload: { selectedIndex: number }): void;
}>();

const selectedIndex = ref<number | null>(null);

const handleSelect = (idx: number) => {
  if (props.disabled) return;

  selectedIndex.value = idx;
  emit("select", { selectedIndex: idx });
};

const getVariant = (idx: number) => {
  return selectedIndex.value === idx ? "selected" : "default";
};
</script>

<template>
  <div class="w-full max-w-2xl bg-white border rounded-xl p-5 shadow-sm">
    <h2 class="Subtitle2 mb-4">
      {{ question.description }}
    </h2>

    <div class="flex flex-col gap-3">
      <ChoiceOption
        v-for="(choice, idx) in question.choices"
        :key="idx"
        :text="choice"
        :variant="getVariant(idx)"
        :disabled="disabled"
        @click="() => handleSelect(idx)"
      />
    </div>
  </div>
</template>
