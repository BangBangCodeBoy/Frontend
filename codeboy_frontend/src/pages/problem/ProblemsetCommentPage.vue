<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import CommentItem from "@/entities/commnet/ui/CommentItem.vue";
import { useRoute, useRouter } from "vue-router";
import { useCommentList } from "@/features/comment/model/useCommentList";
import { onMounted } from "vue";
import { ref } from "vue";
import { useAddComment } from "@/features/comment/model/useAddComment";
import { NetworkIcon } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();

const problemSetId = Number(route.params.id);

const { fetchCommentList, isLoading, error, commentList } = useCommentList();

const { fetchComment, isLoading : isAddingComment, error: addError } = useAddComment();

onMounted(() => {
  fetchCommentList(problemSetId);
});

const goIncorrectNote = () => {
  router.push({ name: "incorrectNotes" });
};

const newComment = ref("");

const handleAddComment = async () => {
  const content = newComment.value.trim();
  if (!content) {
    alert("댓글 내용을 입력해주세요.");
    return;
  }

  await fetchComment(problemSetId, { content });

  await fetchCommentList(problemSetId);

  newComment.value = "";
};

console.log("화면에서 문제 리스트 출력해보기: ", commentList);
</script>

<template>
  <p>문제를 모두 풀었어요</p>
  <Button @click="goIncorrectNote">틀린 문제 복습하러 가기 </Button>

  <div v-if="isLoading">댓글 불러오는 중...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <ul v-else>
    <li v-for="comment in commentList" :key="comment.commentId">
      <CommentItem :comment="comment" />
    </li>
  </ul>

  <!-- 댓글 작성 영역 -->
  <div class="mt-4 flex gap-2 items-center">
    <!-- Input 컴포넌트가 v-model을 지원한다고 가정 -->
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

  <!-- 등록 에러 표시 (선택사항) -->
  <p v-if="addError" class="mt-2 text-xs text-red-500">
    {{ addError.message }}
  </p>
</template>

<style scoped></style>
