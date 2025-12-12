<script setup lang="ts">
import { Comment } from "@/shared/api/generated";
import { computed, onMounted, ref, watch } from "vue";
import { useMemberNickname } from "@/features/member/model/useMemberNickname";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const props = defineProps<{
  comment: Comment;
  isOwn: boolean;
}>();

const emit = defineEmits<{
  (e: "update", content: string): void;
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

// 인라인 수정 상태
const isEditing = ref(false);
const draftContent = ref("");
// comment.content가 바뀌면(리스트 새로고침 등) 수정 중이 아닐 때 draftContent도 동기화
// watch(
//   () => props.comment.content,
//   (val) => {
//     if (!isEditing.value) {
//       draftContent.value = val ?? "";
//     }
//   }
// );

onMounted(async () => {
  if (props.comment.memberId) {
    await fetchNickname(props.comment.memberId);
    nickname.value = getNickname(props.comment.memberId) ?? "익명";
  }
});

const handleEditClick = () => {
  if (!props.isOwn) return;
  isEditing.value = true;
  draftContent.value = props.comment.content ?? "";
};

const handleCancelEdit = () => {
  isEditing.value = false;
  draftContent.value = props.comment.content ?? "";
};
const handleSaveEdit = () => {
  const trimmed = draftContent.value.trim();
  if (!trimmed) {
    alert("댓글 내용은 비워둘 수 없습니다.");
    return;
  }
  emit("update", trimmed);
  isEditing.value = false;
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
      <span class="font-medium text-gray-600">
        {{ nickname }}
      </span>
      <span>
        {{ createdAt }}
      </span>
    </div>

    <!-- ✅ 수정/보기 모드 전환 -->
    <div v-if="isEditing" class="flex flex-col gap-2">
      <Input
        v-model="draftContent"
        class="w-full"
        placeholder="댓글을 입력해 주세요."
      />
      <div class="flex gap-2 justify-end text-[11px]">
        <Button
          type="button"
          class="px-2 py-1"
          variant="outline"
          @click="handleCancelEdit"
        >
          취소
        </Button>
        <Button type="button" class="px-2 py-1" @click="handleSaveEdit">
          저장
        </Button>
      </div>
    </div>
    <div v-else class="flex flex-col gap-1">
      <!-- 댓글 내용 -->
      <p class="text-sm text-gray-900 whitespace-pre-wrap">
        {{ props.comment.content }}
      </p>

      <!-- 내가 쓴 댓글일 때만 수정/삭제 버튼 -->
      <div
        v-if="isOwn"
        class="flex items-center gap-2 text-[11px] text-gray-500 justify-end"
      >
        <button
          type="button"
          class="underline hover:text-primary-600"
          @click="handleEditClick"
        >
          수정
        </button>
        <span class="text-gray-300">|</span>
        <button
          type="button"
          class="underline hover:text-red-500"
          @click="handleDeleteClick"
        >
          삭제
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped></style>
