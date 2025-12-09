<!-- ProblemCard.vue -->
<script setup lang="ts">
import { Category } from "@/entities/types";
import type { HTMLAttributes } from "vue";
import { MessageCircle } from "lucide-vue-next"; // 아이콘 사용 (원치 않으면 제거 가능)

const props = defineProps<{
  title: string;
  category: Category;
  nickname: string;
  commentCount: number;
  disabled?: boolean;
  className?: HTMLAttributes["class"];
}>();

const emits = defineEmits<{
  (e: "click"): void;
}>();

const categoryLabelMap: Record<Category, string> = {
  [Category.INFOENGINEERING]: "정보처리기사",
  [Category.SQLD]: "SQLD",
};
</script>

<template>
  <article
    :class="[
      'w-full rounded-xl border bg-white px-4 py-3 shadow-sm flex items-center justify-between gap-3 transition-all',
      props.disabled
        ? 'cursor-not-allowed opacity-60'
        : 'cursor-pointer hover:shadow-md hover:border-primary-200',
      props.className,
    ]"
    @click="!disabled && emits('click')"
  >
    <!-- 왼쪽: 문제 정보 -->
    <div class="flex min-w-0 flex-col gap-1">
      <!-- 카테고리 배지 -->
      <span
        class="inline-flex w-fit items-center rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-medium text-primary-600"
      >
        {{ categoryLabelMap[props.category] }}
      </span>

      <!-- 제목 -->
      <h3 class="truncate text-sm font-semibold text-gray-900">
        {{ title }}
      </h3>

      <!-- 작성자 -->
      <p class="text-[11px] text-gray-500">작성자 {{ nickname }}</p>
    </div>

    <!-- 오른쪽: 댓글 개수 -->
    <div class="flex flex-shrink-0 items-center gap-1 text-xs text-gray-500">
      <MessageCircle class="h-4 w-4" />
      <span>{{ commentCount }}</span>
    </div>
  </article>
</template>

<style scoped></style>
