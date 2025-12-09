<!-- ProblemList.vue (예시) -->
<script setup lang="ts">
import { computed, ref } from "vue";
import { Category } from "@/entities/types";
import ProblemCard from "@/entities/problem/ui/ProblemCard.vue"; // 경로는 프로젝트 구조에 맞게 수정
import Button from "@/components/ui/button/Button.vue";

const problems = [
  {
    id: 1,
    title: "알고리즘 스터디 1반",
    category: Category.INFOENGINEERING,
    nickname: "긍긍따",
    commentCount: 8,
  },
  {
    id: 2,
    title: "알고리즘 스터디 2",
    category: Category.SQLD,
    nickname: "민달팽",
    commentCount: 2,
  },
];

type FilterCategory = Category | "ALL";

const selectedCategory = ref<FilterCategory>("ALL");

const categoryList: FilterCategory[] = [
  "ALL",
  Category.INFOENGINEERING,
  Category.SQLD,
];

const handleClickProblem = (id: number) => {
  console.log("문제 카드 클릭", id);
};

const categoryLabelMap: Record<FilterCategory, string> = {
  ALL: "전체",
  [Category.INFOENGINEERING]: "정보처리기사",
  [Category.SQLD]: "SQLD",
};

const filteredProblems = computed(() => {
  if (selectedCategory.value === "ALL") {
    return problems;
  }
  return problems.filter(
    (problem) => problem.category === selectedCategory.value
  );
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between gap-3">
      <h2 class="text-lg font-semibold">시험 대비 문제</h2>

      <Button type="submit" form="dialogForm"> 문제 만들기 </Button>
    </div>

    <!-- 카테고리 필터 버튼 그룹 -->
    <div class="flex items-center justify-end gap-2">
      <button
        v-for="cat in categoryList"
        :key="cat"
        type="button"
        class="rounded-full border px-3 py-1 text-xs transition-colors"
        :class="
          selectedCategory === cat
            ? 'border-primary-500 bg-primary-50 text-primary-600'
            : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
        "
        @click="selectedCategory = cat"
      >
        {{ categoryLabelMap[cat as FilterCategory] }}
      </button>
    </div>

    <!-- 문제 카드 리스트 -->
    <div class="flex flex-col gap-2">
      <ProblemCard
        v-for="problem in filteredProblems"
        :key="problem.id"
        :title="problem.title"
        :category="problem.category"
        :nickname="problem.nickname"
        :comment-count="problem.commentCount"
        @click="() => handleClickProblem(problem.id)"
      />
    </div>
  </div>
</template>

<style scoped></style>
