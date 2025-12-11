<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import CommentItem from "@/entities/commnet/ui/CommentItem.vue";
import { useRoute, useRouter } from "vue-router";
import { useCommentList } from "@/features/comment/model/useCommentList";
import { onMounted } from "vue";

const route = useRoute();
const router = useRouter();

const problemSetId = Number(route.params.id);

const { fetchCommentList, isLoading, error, commentList } = useCommentList();

onMounted(() => {
  fetchCommentList(problemSetId);
});

const goIncorrectNote = () => {
  router.push({ name: "incorrectNotes" });
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

  <Input />
  <Button>댓글 작성하기 </Button>
</template>

<style scoped></style>
