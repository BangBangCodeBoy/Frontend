<!-- src/pages/ranking/RankingPage.vue -->
<script setup lang="ts">
import RankingPodiumSection from "./ui/RankingPodiumSection.vue";
import RankingOthersSection from "./ui/RankingOthersSection.vue";
import { useRanking } from "@/features/ranking/model/useRanking";

const { top3, others, isLoading, error, refetch } = useRanking();
</script>

<template>
  <div class="flex flex-col gap-6 px-4 py-6">
    <header class="text-center">
      <h1 class="text-xl font-bold">이번 주 랭킹</h1>
    </header>

    <!-- 로딩 상태 -->
    <div v-if="isLoading" class="py-10 text-center text-gray-500">
      랭킹 정보를 불러오는 중입니다...
    </div>

    <!-- 에러 상태 -->
    <div
      v-else-if="error"
      class="py-10 text-center text-red-500 flex flex-col gap-3"
    >
      <p>랭킹 정보를 불러오지 못했습니다.</p>
      <button
        @click="refetch"
        class="px-4 py-2 bg-primary-500 text-white font-semibold rounded-lg"
      >
        다시 시도
      </button>
    </div>

    <!-- 🏅 TOP 3 시상대 -->
    <RankingPodiumSection :top-three="top3" />

    <!-- 📋 나머지 랭킹 리스트 -->
    <RankingOthersSection :others="others" />
  </div>
</template>

<style scoped></style>
