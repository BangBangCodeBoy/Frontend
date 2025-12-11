<!-- src/pages/problem/ProblemSetCreatePage.vue -->
<script setup lang="ts">
import { UserProblemSetCategory as Category } from "@/shared/api/generated";
import Button from "@/components/ui/button/Button.vue";
import { Field, FieldSeparator } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import QuestionCreationForm from "@/features/problem-set/ui/QuestionCreationForm.vue";
import { useProblemSetCreation } from "@/features/problem-set/model/useProblemSetCreation";

const {
  problemSetTitle,
  problemSetCategory,
  currentProblem,
  totalProblemCount,
  displayProblemIndex,
  errorMessage,
  successMessage,
  isSubmitting,
  addCurrentProblem,
  submitAll,
} = useProblemSetCreation();

const categoryOptions = [
  { value: Category.INFOENGINEERING, label: "정보처리기사" },
  { value: Category.SQLD, label: "SQLD" },
];
</script>

<template>
  <main class="min-h-screen bg-slate-50">
    <div class="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <!-- 헤더 -->
      <header class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-semibold text-slate-900">
            나만의 문제 세트 만들기
          </h1>
          <p class="mt-1 text-xs text-slate-500">
            시험 대비를 위한 문제집을 직접 만들어 보세요.
          </p>
        </div>
        <span
          class="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-600"
        >
          현재 {{ totalProblemCount }}개 작성 완료 · {{ displayProblemIndex }}번
          문제 작성 중
        </span>
      </header>

      <!-- 메시지 -->
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

      <!-- 문제 세트 메타 정보: 제목 + 카테고리 -->
      <section
        class="rounded-2xl border border-slate-200 bg-white p-5 space-y-4"
      >
        <!-- 문제집 제목 -->
        <div class="space-y-1.5">
          <Label class="text-xs font-medium text-slate-700">
            문제집 제목
          </Label>
          <InputGroup>
            <InputGroupInput
              placeholder="예: 2025 정보처리기사 1회 모의고사"
              v-model="problemSetTitle"
            />
          </InputGroup>
        </div>

        <!-- 카테고리 선택 -->
        <div class="space-y-1.5">
          <Label class="text-xs font-medium text-slate-700"> 카테고리 </Label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="cat in categoryOptions"
              :key="cat.value"
              type="button"
              class="rounded-full border px-3 py-1 text-xs transition-colors"
              :class="
                problemSetCategory === cat.value
                  ? 'border-primary-500 bg-primary-50 text-primary-600'
                  : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
              "
              @click="problemSetCategory = cat.value"
            >
              {{ cat.label }}
            </button>
          </div>
        </div>
      </section>

      <FieldSeparator />

      <!-- 문제 한 개 작성 영역 -->
      <section class="rounded-2xl border border-slate-200 bg-white p-5">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-sm font-semibold text-slate-900">
            {{ displayProblemIndex }}번 문제
          </h2>
          <span class="text-[11px] text-slate-400">
            지금까지 {{ totalProblemCount }}개 완료
          </span>
        </div>

        <!-- ✅ 여기서 QuestionCreationForm을 사용 -->
        <QuestionCreationForm
          v-model="currentProblem"
          @clickAdd="addCurrentProblem"
          @clickSubmit="submitAll"
        />
      </section>
    </div>
  </main>
</template>
