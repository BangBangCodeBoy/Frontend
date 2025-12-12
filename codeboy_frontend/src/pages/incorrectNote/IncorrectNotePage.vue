<script setup lang="ts"></script>

<template>
  <div class="flex flex-col justify-center items-center px-4 py-4 gap-5 w-full">
    <!-- 로딩 표시 -->
    <p v-if="isLoading" class="Body2 text-gray-500">문제를 불러오는 중...</p>

    <!-- 에러 표시 -->
    <p v-else-if="error" class="Body2 text-red-500">
      오류가 발생했습니다: {{ error.message }}
    </p>

    <!-- 문제 표시 -->
    <template v-else>
      <UserProblemCard
        v-if="currentQuestion"
        :question="currentQuestion"
        @answered="handleAnswered"
      />

      <p v-if="lastResult" class="mt-4 Body2 text-center">
        {{ lastResult.correct ? "정답입니다 🎉" : "아쉽지만 오답입니다 😢" }}
      </p>

      <Button size="default" class="w-full" @click="goNext">
        {{
          currentIndex < problemList.length - 1
            ? "다음 문제"
            : "문제 풀이 완료 🎉"
        }}
      </Button>
    </template>
  </div>
</template>
