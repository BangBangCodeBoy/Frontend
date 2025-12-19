<!-- src/pages/quizroom-waiting/ui/QuizroomWaitingPage.vue -->
<script setup lang="ts">
import { ref } from "vue";
import type { Participant } from "@/entities/participant/model/participant.type";
import LoadingDots from "@/shared/ui/loading-dots/LoadingDots.vue";
import QuizroomActions from "@/widgets/quizroom-actions/ui/QuizroomActions.vue";
import QuizroomParticipantsList from "@/widgets/quizroom-participants/ui/QuizroomParticipantsList.vue";

// 테스트용 참가자 목록
const participants = ref<Participant[]>([
  { id: 1, name: "현명", isHost: true },
  { id: 2, name: "지훈", isHost: false },
  { id: 3, name: "민수", isHost: false },
]);

// 현재 사용자 역할
const isHost = true;
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center px-4">
    <!-- Title + 로딩 애니메이션 -->
    <div class="flex flex-col items-center mb-8">
      <h2 class="Subtitle1 mb-2">퀴즈방 대기 중...</h2>
      <LoadingDots />
    </div>

    <!-- 참가자 박스 위젯 -->
    <QuizroomParticipantsList :participants="participants" />

    <!-- 버튼 영역 위젯 -->
    <QuizroomActions :isHost="isHost" />
  </div>
</template>

<style scoped>
/* 페이지 자체는 특별한 애니메이션 없으면 스타일 최소화해도 됨 */
</style>
