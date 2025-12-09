<!-- src/pages/ranking/ui/RankingOthersSection.vue -->
<script setup lang="ts">
import type { RankingMember } from "../model/types";

const props = defineProps<{
  others: RankingMember[];
}>();
</script>

<template>
  <section
    class="mt-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm"
  >
    <div
      class="flex items-center border-b border-gray-200 pb-2 text-[11px] font-semibold text-gray-500"
    >
      <div class="w-10 text-center">Rank</div>
      <div class="flex-1 pl-2">멤버</div>
      <div class="w-14 text-right">Score</div>
    </div>

    <div
      v-if="props.others.length === 0"
      class="py-4 text-center text-xs text-gray-400"
    >
      나머지 랭킹 데이터가 없습니다.
    </div>

    <ul v-else class="divide-y divide-gray-100">
      <li
        v-for="(member, index) in props.others"
        :key="member.nickname + member.score"
        class="flex items-center py-2 text-xs"
      >
        <!-- 전체 랭킹 번호: 4등부터 시작 -->
        <div class="w-10 text-center text-gray-600">
          {{ index + 4 }}
        </div>

        <!-- 닉네임 -->
        <div class="flex-1 pl-2 text-gray-800">
          <span class="block truncate">
            {{ member.nickname }}
          </span>
        </div>

        <!-- 점수 -->
        <div class="w-14 text-right text-[13px] font-semibold text-indigo-500">
          {{ member.score }}
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped></style>
