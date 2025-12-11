<script setup lang="ts">
import { Comment } from "@/shared/api/generated";
import { computed, onMounted } from "vue";
import { useMemberNickname } from "@/features/member/model/useMemberNickname";
import { ref } from "vue";

const props = defineProps<{
  comment: Comment;
  isOwn: boolean;
}>();

const emit = defineEmits<{
  (e: "edit"): void;
  (e: "delete"): void;
}>();

// 날짜 포맷팅 (예: 2025-12-11 형태로 자르기)
const createdAt = computed(() => {
  if (!props.comment.commentDate) return "";
  // ISO 문자열이라고 가정하고 앞부분만 사용
  return props.comment.commentDate.slice(0, 10);
});
const { fetchNickname, getNickname } = useMemberNickname();

const nickname = ref("");

onMounted(async () => {
  if (props.comment.memberId) {
    await fetchNickname(props.comment.memberId);
    nickname.value = getNickname(props.comment.memberId) ?? "익명";
  }
});

const handleEditClick = () => {
  emit("edit");
};

const handleDeleteClick = () => {
  emit("delete");
};
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
    <div v-if="isOwn" class="flex items-center gap-2 text-[11px] text-gray-500">
      <Button
        type="button"
        class="underline hover:text-primary-600"
        @click="handleEditClick"
        >수정</Button
      >
      <span class="text-gray-300">|</span>
      <Button
        type="button"
        class="underline hover:text-red-500"
        @click="handleDeleteClick"
      >
        삭제
      </Button>
    </div>
    <!-- 댓글 내용 -->
    <p class="text-sm text-gray-900 whitespace-pre-wrap">
      {{ props.comment.content }}
    </p>
  </article>
</template>

<style scoped></style>
