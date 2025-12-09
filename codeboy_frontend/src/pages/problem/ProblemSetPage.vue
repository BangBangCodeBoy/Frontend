<script setup lang="ts">
import { ref } from "vue";
import type { ChoiceQuestion } from "@/entities/question/model/question.types";
import UserProblemCard from "@/widgets/user-problem-card/ui/UserProblemCard.vue";
import Button from "@/components/ui/button/Button.vue";

const question = ref<ChoiceQuestion>({
  id: 1,
  description: "다음 중 JavaScript의 Primitive 타입이 아닌 것은?",
  choices: ["string", "number", "boolean", "Array"],
  answerIndex: 3,
});

const lastResult = ref<null | { correct: boolean; selectedIndex: number }>(
  null
);

const handleAnswered = (payload: {
  correct: boolean;
  selectedIndex: number;
}) => {
  lastResult.value = payload;
  // 필요하면 여기서 "정답입니다 / 오답입니다" 토스트나 텍스트 띄우기
};
</script>

<template>
  <div class="flex flex-col justify-center items-center px-4 gap-5">
    <UserProblemCard :question="question" @answered="handleAnswered" />

    <p v-if="lastResult" class="mt-4 Body2">
      {{ lastResult.correct ? "정답입니다 🎉" : "아쉽지만 오답입니다 😢" }}
    </p>

    <Button size="default" class="w-full">다음 문제</Button>
  </div>
</template>
