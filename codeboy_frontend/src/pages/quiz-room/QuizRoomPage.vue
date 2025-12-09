<!-- src/pages/quizroom-question/ui/QuizroomQuestionPage.vue -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { ChoiceQuestion } from "@/entities/question/model/question.types";
import QuizroomProblemCard from "@/widgets/quizroom-problem-card/ui/QuizroomProblemCard.vue";

const question = ref<ChoiceQuestion>({
  id: 1,
  description: "HTTP 상태 코드 404의 의미는?",
  choices: ["서버 오류", "권한 없음", "페이지를 찾을 수 없음", "요청 성공"],
  answerIndex: 2, // 실제 정답이지만, 이 페이지에서는 바로 쓰지 않음
});

const selectedIndex = ref<number | null>(null);
const isLocked = ref(false);
const showResultModal = ref(false);
const isCorrect = ref<boolean | null>(null);

// 🔔 실시간 퀴즈 로직 예시
const handleSelect = ({ selectedIndex: idx }: { selectedIndex: number }) => {
  selectedIndex.value = idx;
  // 여기서 서버에 "나 이거 골랐어" 이벤트 보낼 수 있음
};

onMounted(() => {
  // 예시: 5초 뒤에 정답 공개 모달 띄우기
  setTimeout(() => {
    if (selectedIndex.value != null) {
      isCorrect.value = selectedIndex.value === question.value.answerIndex;
    } else {
      isCorrect.value = false;
    }
    isLocked.value = true;
    showResultModal.value = true;
  }, 5000);
});
</script>

<template>
  <div class="flex flex-col justify-center items-center px-4">
    <QuizroomProblemCard
      :question="question"
      :disabled="isLocked"
      @select="handleSelect"
    />

    <!-- 결과 모달 (매우 단순한 예시) -->
    <div
      v-if="showResultModal"
      class="fixed inset-0 flex items-center justify-center bg-black/40"
    >
      <div class="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
        <p class="Subtitle2 mb-3">결과</p>
        <p class="Body2 mb-4">
          <span v-if="isCorrect === true">정답입니다! 🎉</span>
          <span v-else>아쉽지만 오답입니다 😢</span>
        </p>
        <button
          class="px-4 py-2 rounded-md bg-primary-500 text-white Body2"
          @click="showResultModal = false"
        >
          닫기
        </button>
      </div>
    </div>
  </div>
</template>
