<!-- src/pages/ranking/RankingPage.vue -->
<script setup lang="ts">
import { ref, computed } from "vue";
import type { RankingMember } from "./model/types";
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

    <!-- 🏅 TOP 3 시상대 -->
    <RankingPodiumSection :top-three="top3" />

    <!-- 📋 나머지 랭킹 리스트 -->
    <RankingOthersSection :others="others" />
  </div>
</template>

<style scoped></style>
