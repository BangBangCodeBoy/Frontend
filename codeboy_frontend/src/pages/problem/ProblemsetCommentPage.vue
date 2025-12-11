<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { useRoute, useRouter } from "vue-router";
import CommentSection from "@/widgets/commnet-section/ui/CommentSection.vue";

const route = useRoute();
const router = useRouter();

const problemSetId = Number(route.params.id);

const goIncorrectNote = () => {
  router.push({ name: "incorrectNotes" });
};
</script>

<template>
  <section class="flex flex-col gap-6">
    <!-- 상단 결과 카드 -->
    <header
      class="flex items-center justify-between gap-4 rounded-2xl border border-primary-100 bg-gradient-to-r from-primary-50 to-primary-100 px-5 py-4 shadow-sm"
    >
      <div class="flex flex-col gap-1">
        <p class="text-xs font-medium text-primary-600">✅ 오늘의 학습 완료</p>
        <h2 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
          🎉 문제를 모두 풀었어요!
        </h2>
        <p class="text-xs text-gray-600">
          방금 푼 문제 중에서
          <span class="font-semibold text-primary-700">틀린 문제</span>만 모아서
          한 번 더 복습해 볼까요?
        </p>
      </div>

      <Button
        @click="goIncorrectNote"
        class="shrink-0 px-4 py-2 text-sm font-semibold"
      >
        틀린 문제 복습하러 가기
      </Button>
    </header>

    <!-- 댓글 위젯 -->
    <CommentSection :problem-set-id="problemSetId" />
  </section>
</template>
