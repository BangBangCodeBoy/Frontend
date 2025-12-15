<!-- src/pages/mypage/ui/MyPage.vue -->
<script setup lang="ts">
import MemberProfileCard from "@/features/member/ui/MemberProfileCard.vue";
import ProblemCard from "@/entities/problem/ui/ProblemCard.vue";
import { useProblemSetList } from "@/features/problem-set/model";
import { useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { useMemberNickname } from "@/features/member/model/useMemberNickname";
import { useMyProblemSetList } from "@/features/problem-set/model";

const { myProblemSetList, isLoading, error, fetchMyProblemList } =
  useMyProblemSetList();

const { fetchNickname, getNickname } = useMemberNickname();

const router = useRouter();
onMounted(() => {
  fetchMyProblemList();
});

const nickname = ref<string>("");

watch(myProblemSetList, async (list) => {
  if (!list.length) return;

  const memberId = list[0].memberId;
  nickname.value = await fetchNickname(memberId);
});

const handleClickProblem = (id: number) => {
  router.push({ name: "problemSet", params: { id }, query: { isOwn: "1" } });
  console.log("문제 카드 클릭", id);
};
</script>

<template>
  <main class="min-h-screen bg-slate-50">
    <div class="mx-auto max-w-lg px-4">
      <!-- 프로필 카드 -->
      <MemberProfileCard />

      <!-- 섹션 타이틀 -->
      <div class="mt-8 mb-4">
        <p class="Subtitle1 text-slate-800">내가 만든 문제</p>
      </div>

      <!-- 문제 카드 리스트 -->
      <div class="flex flex-col gap-3">
        <ProblemCard
          v-for="problem in myProblemSetList"
          :key="problem.userProblemSetId"
          :title="problem.problemSetTitle"
          :category="problem.category"
          :nickname="nickname"
          :comment-count="problem.commentCount"
          class="cursor-pointer"
          @click="() => handleClickProblem(problem.userProblemSetId)"
        />
      </div>
    </div>
  </main>
</template>
