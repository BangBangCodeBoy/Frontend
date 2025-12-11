<!-- src/widgets/solo-question-card/ui/SoloQuestionCard.vue -->
<script setup lang="ts">
import { ref, computed } from "vue";
import type { UserProblem } from "@/shared/api/generated";
import ChoiceOption from "@/shared/ui/choice-option/ChoiceOption.vue";

const props = defineProps<{
  question: UserProblem;
}>();

const emit = defineEmits<{
  (e: "answered", payload: { correct: boolean; selectedIndex: number }): void;
}>();

const selectedIndex = ref<number | null>(null);
const showResult = ref(false);

/**
 * choice1 ~ choice4 를 내부에서 배열로 변환해서 사용
 * 인덱스: 0 → choice1, 1 → choice2, ...
 */
const choices = computed(() => [
  props.question.choice1 ?? "",
  props.question.choice2 ?? "",
  props.question.choice3 ?? "",
  props.question.choice4 ?? "",
]);

/**
 * answerChoice: 1~4 → 0~3 인덱스로 변환
 */
const correctIndex = computed(() => {
  const choiceNum = props.question.answerChoice ?? 0;
  return choiceNum > 0 ? choiceNum - 1 : -1;
});

const handleSelect = (idx: number) => {
  if (showResult.value) return; // 이미 채점된 상태라면 무시

  selectedIndex.value = idx;
  showResult.value = true;

  emit("answered", {
    correct: idx === correctIndex.value,
    selectedIndex: idx,
  });
};

const getVariant = (idx: number) => {
  if (!showResult.value) {
    // 아직 채점 전이면, 선택 여부만 표시
    return selectedIndex.value === idx ? "selected" : "default";
  }

  // 채점된 상태
  if (idx === correctIndex.value) {
    return "correct";
  }
  if (selectedIndex.value === idx && idx !== correctIndex.value) {
    return "incorrect";
  }
  return "default";
};

const isDisabled = computed(() => showResult.value);
</script>

<template>
  <div class="w-full max-w-2xl bg-white border rounded-xl p-5 shadow-sm">
    <h2 class="Subtitle2 mb-4">
      {{ question.problemDescription }}
    </h2>

    <div class="flex flex-col gap-3">
      <ChoiceOption
        v-for="(choice, idx) in choices"
        :key="idx"
        :text="choice"
        :variant="getVariant(idx)"
        :disabled="isDisabled"
        @click="() => handleSelect(idx)"
      />
    </div>
  </div>
</template>
