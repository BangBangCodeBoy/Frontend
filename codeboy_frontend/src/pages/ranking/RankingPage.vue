<!-- src/pages/ranking/RankingPage.vue -->
<script setup lang="ts">
import { ref, computed } from "vue";
import type { RankingMember } from "./model/types";
import RankingPodiumSection from "./ui/RankingPodiumSection.vue";
import RankingOthersSection from "./ui/RankingOthersSection.vue";

const members = ref<RankingMember[]>([
  { nickname: "현명", score: 24 },
  { nickname: "민달팽", score: 22 },
  { nickname: "긍긍따", score: 21 },
  { nickname: "샘플A", score: 18 },
  { nickname: "샘플B", score: 15 },
]);

const sortedMembers = computed(() =>
  [...members.value].sort((a, b) => b.score - a.score)
);

const topThree = computed(() => sortedMembers.value.slice(0, 3));
const others = computed(() => sortedMembers.value.slice(3));
</script>

<template>
  <div class="flex flex-col gap-6 px-4 py-6">
    <header class="text-center">
      <h1 class="text-xl font-bold">이번 주 랭킹</h1>
    </header>

    <!-- 🏅 TOP 3 시상대 -->
    <RankingPodiumSection :top-three="topThree" />

    <!-- 📋 나머지 랭킹 리스트 -->
    <RankingOthersSection :others="others" />
  </div>
</template>

<style scoped></style>
