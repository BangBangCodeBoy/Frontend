<!-- src/pages/problem-set/ui/ProblemList.vue (예시) -->
<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import ProblemCard from "@/entities/problem/ui/ProblemCard.vue";
import Button from "@/components/ui/button/Button.vue";
import { useRouter } from "vue-router";
import { useProblemSetList } from "@/features/problem-set/model/useProblemList";
import { useMemberNickname } from "@/features/member/model/useMemberNickname";
import ProblemCategoryFilter from "@/features/problem-set/ui/ProblemCategoryFilter.vue";
import type { FilterCategory } from "@/features/problem-set/model/filterCategory";

const router = useRouter();
const { problemSetList, isLoading, error, fetchProblemList } =
  useProblemSetList();
const { fetchNickname, getNickname } = useMemberNickname();

onMounted(() => {
  fetchProblemList();
});

// 문제 목록이 바뀔 때마다 해당 memberId들의 닉네임을 미리 로드
watch(
  problemSetList,
  (list) => {
    const ids = Array.from(
      new Set(list.map((p) => p.memberId).filter((id): id is number => !!id))
    );
    ids.forEach((id) => {
      fetchNickname(id);
    });
  },
  { immediate: true }
);

const selectedCategory = ref<FilterCategory>("ALL");

const handleClickCreateProblem = () => {
  router.push({ name: "problemCreate" });
};

const handleClickProblem = (id: number) => {
  console.log("문제 카드 클릭", id);
};

const filteredProblems = computed(() => {
  const list = problemSetList.value ?? [];

  if (selectedCategory.value === "ALL") {
    return list;
  }
  return list.filter((problem) => problem.category === selectedCategory.value);
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between gap-3">
      <h2 class="text-lg font-semibold">시험 대비 문제</h2>

      <Button type="button" @click="handleClickCreateProblem">
        문제 만들기
      </Button>
    </div>

    <!-- 카테고리 필터 -->
    <ProblemCategoryFilter v-model="selectedCategory" />

    <div v-if="isLoading">불러오는 중...</div>
    <div v-else-if="error">{{ error.message }}</div>

    <!-- 문제 카드 리스트 -->
    <div v-else class="flex flex-col gap-2">
      <ProblemCard
        v-for="problem in filteredProblems"
        :key="problem.userProblemSetId"
        :title="problem.problemSetTitle"
        :category="problem.category"
        :nickname="getNickname(problem.memberId)"
        :comment-count="problem.commentCount"
        @click="() => handleClickProblem(problem.userProblemSetId)"
      />
    </div>
  </div>
</template>
