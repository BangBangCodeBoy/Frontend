<script setup lang="ts">
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  title: string;
  participants: number;
  maxParticipants?: number;
  disabled?: boolean;
  class?: HTMLAttributes["class"];
}>();

const emits = defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <article
    :class="[
      'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm flex items-center justify-between gap-3',
      props.class,
    ]"
  >
    <!-- 왼쪽: 방 정보 -->
    <div class="flex flex-col gap-1 min-w-0">
      <h2 class="Body1 font-semibold text-gray-900 truncate">
        {{ title }}
      </h2>

      <p class="Caption text-gray-500">
        참여 인원
        <span class="font-semibold text-gray-700">
          {{ participants }}
          <template v-if="maxParticipants"> / {{ maxParticipants }}</template
          >명
        </span>
      </p>
    </div>

    <!-- 오른쪽: 참여 버튼 -->
    <button
      type="button"
      class="shrink-0 rounded-md bg-primary-500 px-3 py-2 text-sm font-medium text-white hover:bg-primary-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
      :disabled="disabled"
      @click="emits('click')"
    >
      참여하기
    </button>
  </article>
</template>

<style scoped></style>
