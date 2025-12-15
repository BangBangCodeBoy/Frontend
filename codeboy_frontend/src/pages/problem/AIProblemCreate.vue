<script setup lang="ts">
import { UserProblemSetCategory as Category } from "@/shared/api/generated";
import { useProblemSetCreation } from "@/features/problem-set/model/useProblemSetCreation";

import AIProblemCreateForm from "@/features/problem-set/ai-create/ui/AIProblemCreateForm.vue";
import ProblemSetCreatedModal from "@/features/problem-set/ai-create/ui/ProblemSetCreatedModal.vue";
import { useAIProblemCreateFlow } from "@/features/problem-set/ai-create/model/useAIProblemCreateFlow";

const {
  submitAllWithProblems,
  problemSetTitle,
  problemSetCategory,
  errorMessage,
  successMessage,
} = useProblemSetCreation();

const categoryOptions = [
  { value: Category.INFOENGINEERING, label: "정보처리기사" },
  { value: Category.SQLD, label: "SQLD" },
];

const flow = useAIProblemCreateFlow({
  getTitle: () => problemSetTitle.value,
  getCategory: () => problemSetCategory.value,
  submitAllWithProblems,
});
</script>

<template>
  <main class="min-h-screen bg-slate-50">
    <div class="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <ProblemSetCreatedModal
        :open="flow.isCreatedModalOpen"
        @close="flow.closeModal"
        @confirm="flow.goToProblemSet"
      />

      <header class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-semibold text-slate-900">AI로 문제 만들기</h1>
          <p class="mt-1 text-xs text-slate-500">
            AI에게 원하는 문제를 요청해보세요
          </p>
        </div>
      </header>

      <div class="space-y-2">
        <p
          v-if="errorMessage"
          class="text-xs rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-700"
        >
          {{ errorMessage }}
        </p>
        <p
          v-if="successMessage"
          class="text-xs rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-700"
        >
          {{ successMessage }}
        </p>
      </div>

      <AIProblemCreateForm
        :title="problemSetTitle"
        :category="problemSetCategory"
        :prompt="flow.prompt"
        :isLoading="flow.isLoading"
        :categoryOptions="categoryOptions"
        @update:title="problemSetTitle = $event"
        @update:category="problemSetCategory = $event"
        @update:prompt="flow.prompt = $event"
        @submit="flow.generateAndSave"
      />
    </div>
  </main>
</template>
