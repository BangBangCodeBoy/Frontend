<script setup lang="ts">
defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "confirm"): void;
}>();
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
  >
    <div class="w-full max-w-sm rounded-2xl bg-white p-5 shadow-lg">
      <h2 class="text-base font-semibold text-slate-900">문제 생성 완료 ✅</h2>
      <p class="mt-2 text-sm text-slate-600">
        AI 문제가 저장되었습니다. 문제 페이지로 이동할까요?
      </p>

      <div class="mt-5 flex gap-2 justify-end">
        <button
          type="button"
          class="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          @click="emit('close')"
        >
          닫기
        </button>
        <button
          type="button"
          class="rounded-lg bg-primary-500 px-3 py-2 text-sm text-white hover:bg-primary-400"
          @click="emit('confirm')"
        >
          문제 페이지로 이동
        </button>
      </div>
    </div>
  </div>
</template>
