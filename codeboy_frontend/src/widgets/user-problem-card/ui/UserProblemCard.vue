<!-- src/widgets/solo-question-card/ui/SoloQuestionCard.vue -->
<script setup lang="ts">
import { ref, computed } from "vue";
import type { ChoiceQuestion } from "@/entities/question/model/question.types";
import ChoiceOption from "@/shared/ui/choice-option/ChoiceOption.vue";

const props = defineProps<{
  question: ChoiceQuestion;
}>();

const emit = defineEmits<{
  (e: "answered", payload: { correct: boolean; selectedIndex: number }): void;
}>();

const selectedIndex = ref<number | null>(null);
const showResult = ref(false);

const handleSelect = (idx: number) => {
  if (showResult.value) return; // 이미 채점된 상태라면 무시
  selectedIndex.value = idx;
  showResult.value = true;

  emit("answered", {
    correct: idx === props.question.answerIndex,
    selectedIndex: idx,
  });
};

const getVariant = (idx: number) => {
  if (!showResult.value) {
    // 아직 채점 전이면, 선택만 표시 or 그냥 디폴트
    return selectedIndex.value === idx ? "selected" : "default";
  }

  // 채점된 상태
  if (idx === props.question.answerIndex) {
    return "correct";
  }
  if (selectedIndex.value === idx && idx !== props.question.answerIndex) {
    return "incorrect";
  }
  return "default";
};

const isDisabled = computed(() => showResult.value);
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
        :disabled="isDisabled"
        @click="() => handleSelect(idx)"
      />
    </div>
  </div>
</template>
