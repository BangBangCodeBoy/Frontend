<script setup lang="ts">
const props = defineProps<{
  content: string; // 댓글 내용
  nickname: string; // 작성자 닉네임
  createdAt: string; // 작성일 (YYYY-MM-DD or ISO string)
}>();
</script>

<template>
  <article
    class="w-full rounded-lg bg-gray-50 p-4 shadow-sm flex flex-col gap-2"
  >
    <div class="flex items-center justify-between text-xs text-gray-500">
      <!-- 작성자 -->
      <span class="font-medium text-gray-600">
        {{ nickname }}
      </span>

      <!-- 작성일 -->
      <span>
        {{ createdAt }}
      </span>
    </div>
    <!-- 댓글 내용 -->
    <p class="text-sm text-gray-900 whitespace-pre-wrap">
      {{ content }}
    </p>
  </article>
</template>

<style scoped></style>
