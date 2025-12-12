<script setup lang="ts">
import UserProblemCard from "@/widgets/user-problem-card/ui/UserProblemCard.vue";
import Button from "@/components/ui/button/Button.vue";
import { useRouter } from "vue-router";
import { useIncorrectNotePlayer } from "@/features/incorrect-note/model/useIncorrectNotePlayer";

const router = useRouter();

const {
  isLoading,
  error,
  incorrectProblems,
  currentQuestion,
  currentIndex,
  totalCount,
  currentNumber,
  lastResult,
  handleAnswered,
  goNext,
  deleteCurrent,
} = useIncorrectNotePlayer();

const handleClickNext = () => {
  const finished = goNext();
  if (finished) {
    router.back();
  }
};

const handleDeleteCurrent = async () => {
  const isEmpty = await deleteCurrent();

  alert("오답노트에서 삭제되었습니다");

  if (isEmpty) {
    router.back();
  }
};
</script>

<template>
  <div class="flex flex-col items-center px-4 py-6 w-full">
    <!-- 상단 타이틀 -->
    <div class="w-full max-w-2xl mb-4 flex items-center justify-between">
      <h1 class="Subtitle1">오답노트</h1>

      <!-- 진행도 표시 -->
      <p v-if="totalCount > 0" class="text-xs text-gray-500">
        {{ currentNumber }} / {{ totalCount }}
      </p>
    </div>

    <!-- 로딩 표시 -->
    <p v-if="isLoading" class="Body2 text-gray-500">
      오답노트를 불러오는 중...
    </p>

    <!-- 에러 표시 -->
    <p v-else-if="error" class="Body2 text-red-500">
      오류가 발생했습니다: {{ error.message }}
    </p>

    <!-- 오답노트 없을 때 -->
    <p v-else-if="incorrectProblems.length === 0" class="Body2 text-gray-500">
      아직 저장된 오답노트가 없습니다.
    </p>

    <!-- 문제 카드 + 하단 버튼들 -->
    <template v-else>
      <div class="w-full max-w-2xl flex flex-col items-stretch gap-4">
        <UserProblemCard
          v-if="currentQuestion"
          :question="currentQuestion"
          @answered="handleAnswered"
        />

        <p v-if="lastResult" class="mt-1 Body2 text-center">
          {{ lastResult.correct ? "정답입니다 🎉" : "아쉽지만 오답입니다 😢" }}
        </p>

        <div class="mt-2 flex gap-3 justify-end">
          <Button size="default" variant="outline" @click="handleDeleteCurrent">
            오답노트에서 삭제
          </Button>

          <Button size="default" @click="handleClickNext">
            {{
              currentIndex < incorrectProblems.length - 1
                ? "다음 오답 풀기"
                : "오답 풀이 완료 🎉"
            }}
          </Button>
        </div>
      </div>
    </template>
  </div>
</template>
