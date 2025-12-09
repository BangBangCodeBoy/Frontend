<!-- src/pages/ranking/ui/RankingPodiumSection.vue -->
<script setup lang="ts">
import type { RankingMember } from "../model/types";

const props = defineProps<{
  topThree: RankingMember[];
}>();
</script>

<template>
  <section class="flex justify-center gap-3">
    <!-- 2등 -->
    <div
      v-if="props.topThree[1]"
      class="flex flex-col items-center justify-end gap-2"
    >
      <div
        class="flex h-28 w-20 flex-col items-center justify-center rounded-2xl bg-orange-400 text-white shadow-md"
      >
        <p class="flex items-baseline">
          <span class="text-lg font-bold">2</span>
          <span class="text-xs ml-0.5">위</span>
        </p>
        <p class="mt-1 flex items-baseline gap-1">
          <span class="text-base font-bold">
            {{ props.topThree[1].score }}
          </span>
          <span class="text-[10px]">점</span>
        </p>
      </div>
      <p class="mt-1 w-20 truncate text-center text-[11px] text-gray-800">
        {{ props.topThree[1].nickname }}
      </p>
    </div>

    <!-- 1등 -->
    <div
      v-if="props.topThree[0]"
      class="flex flex-col items-center justify-end gap-2"
    >
      <div
        class="flex h-32 w-24 flex-col items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg ring-2 ring-orange-300"
      >
        <p class="flex items-baseline">
          <span class="text-lg font-bold">1</span>
          <span class="text-xs ml-0.5">위</span>
        </p>
        <p class="mt-1 flex items-baseline gap-1">
          <span class="text-lg font-extrabold">
            {{ props.topThree[0].score }}
          </span>
          <span class="text-[11px]">점</span>
        </p>
      </div>
      <p
        class="mt-1 w-24 truncate text-center text-xs font-semibold text-gray-900"
      >
        {{ props.topThree[0].nickname }}
      </p>
    </div>

    <!-- 3등 -->
    <div
      v-if="props.topThree[2]"
      class="flex flex-col items-center justify-end gap-2"
    >
      <div
        class="flex h-24 w-20 flex-col items-center justify-center rounded-2xl bg-orange-300 text-white shadow-md"
      >
        <p class="flex items-baseline">
          <span class="text-lg font-bold">3</span>
          <span class="text-xs ml-0.5">위</span>
        </p>
        <p class="mt-1 flex items-baseline gap-1">
          <span class="text-base font-bold">
            {{ props.topThree[2].score }}
          </span>
          <span class="text-[10px]">점</span>
        </p>
      </div>
      <p class="mt-1 w-20 truncate text-center text-[11px] text-gray-800">
        {{ props.topThree[2].nickname }}
      </p>
    </div>
  </section>
</template>

<style scoped></style>
