<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import CommentItem from "@/entities/commnet/ui/CommentItem.vue";
import { useCommentList } from "@/features/comment/model/useCommentList";
import { useAddComment } from "@/features/comment/model/useAddComment";
import { onMounted, ref, computed } from "vue";
import { useSessionStore } from "@/entities/session/model/sessionStore";
import { Comment } from "@/shared/api/generated";
import { useDeleteComment } from "@/features/comment/model/useDeleteComment";
import { useRoute } from "vue-router";

const route = useRoute();

const session = useSessionStore();
const myMemberId = session.memberId;
const problemSetId = Number(route.params.id);

const props = defineProps<{
  problemSetId: number;
}>();

// 댓글 리스트 훅
const { fetchCommentList, isLoading, error, commentList } = useCommentList();
const {
  fetchCommentDelete,
  isLoading: isDeleting,
  error: deleteError,
} = useDeleteComment();

// 댓글 추가 훅
const {
  fetchComment,
  isLoading: isAddingComment,
  error: addError,
} = useAddComment();

// 새 댓글 입력값
const newComment = ref("");

// 최초 진입 시 댓글 리스트 불러오기
onMounted(() => {
  fetchCommentList(props.problemSetId);
});

const hasNoComments = computed(
  () => !isLoading.value && commentList.value.length === 0
);

const handleAddComment = async () => {
  const content = newComment.value.trim();
  if (!content) {
    alert("댓글 내용을 입력해주세요.");
    return;
  }

  await fetchComment(props.problemSetId, { content });

  await fetchCommentList(props.problemSetId);

  newComment.value = "";
};

const handleEditComment = (comment: Comment) => {
  console.log("수정 클릭한 댓글:", comment);
};

const handleDeleteComment = async (comment: Comment) => {
  const ok = confirm("정말 이 댓글을 삭제하시겠습니까?");
  await fetchCommentDelete(problemSetId, comment.commentId);
  if (!ok) return;

  console.log("삭제 요청한 댓글:", comment.commentId);

  await fetchCommentList(props.problemSetId);
};
</script>

<template>
  <section class="mt-6 flex flex-col gap-4">
    <!-- 댓글 리스트 -->
    <div>
      <h2 class="mb-2 text-sm font-semibold text-gray-700">댓글</h2>

      <div v-if="isLoading">댓글 불러오는 중...</div>
      <div v-else-if="error" class="text-xs text-red-500">
        {{ error.message }}
      </div>
      <ul v-else class="flex flex-col gap-2">
        <li v-for="comment in commentList" :key="comment.commentId">
          <CommentItem
            :comment="comment"
            :is-own="comment.memberId === myMemberId"
            @edit="handleEditComment(comment)"
            @delete="handleDeleteComment(comment)"
          />
        </li>

        <li v-if="hasNoComments" class="text-xs text-gray-500">
          아직 작성된 댓글이 없습니다.
        </li>
      </ul>
    </div>

    <!-- 댓글 작성 영역 -->
    <div class="mt-2 flex gap-2 items-center">
      <Input
        v-model="newComment"
        placeholder="댓글을 입력해 주세요."
        class="flex-1"
      />
      <Button
        :disabled="isAddingComment || !newComment.trim()"
        @click="handleAddComment"
      >
        {{ isAddingComment ? "작성 중..." : "댓글 작성하기" }}
      </Button>
    </div>

    <p v-if="addError" class="mt-1 text-xs text-red-500">
      {{ addError.message }}
    </p>
  </section>
</template>

<style scoped></style>
