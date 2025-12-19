<!-- src/pages/problem/ProblemSetCreatePage.vue -->
<script setup lang="ts">
import { UserProblemSetCategory as Category } from "@/shared/api/generated";
import { FieldSeparator } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { useProblemSetCreation } from "@/features/problem-set/model/useProblemSetCreation";
import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";
import { useCreateAIProblem } from "@/features/problem-set/model/useCreateAIProblem";
import { AIProblemRequest } from "@/shared/api/generated";
import { ref } from "vue";
import { AIProblem } from "@/shared/api/generated";
import type { UserProblemForm } from "@/features/problem-set/model/useProblemSetCreation";
import { useRouter } from "vue-router";
import { PROBLEM_SET_CATEGORY_OPTIONS } from "@/entities/problem-set/model/category-options";

const router = useRouter();

const isCreatedModalOpen = ref(false);
const createdProblemSetId = ref<number>(null);

const goToProblemSet = () => {
  if (!createdProblemSetId.value) return;
  const id = createdProblemSetId.value;
  console.log("문제 생성된 id: ", id);
  router.push({ name: "problemSet", params: { id }, query: { isOwn: "2" } });
};

const {
  submitAllWithProblems,
  problemSetTitle,
  problemSetCategory,
  errorMessage,
  successMessage,
} = useProblemSetCreation();

const normalizeAIProblems = (aiProblems: AIProblem[]): UserProblemForm[] => {
  const mapped = aiProblems
    .map((p) => {
      const answer = p.answer ?? 1;
      if (answer < 1 || answer > 4) return null;

      const form: UserProblemForm = {
        problemDescription: p.problemDescription?.trim() ?? "",
        choice1: p.choice1?.trim() ?? "",
        choice2: p.choice2?.trim() ?? "",
        choice3: p.choice3?.trim() ?? "",
        choice4: p.choice4?.trim() ?? "",
        answerChoice: String(answer),
      };

      // 필수값 누락이면 제외
      if (
        !form.problemDescription ||
        !form.choice1 ||
        !form.choice2 ||
        !form.choice3 ||
        !form.choice4
      )
        return null;

      return form;
    })
    .filter((v): v is UserProblemForm => !!v);

  return mapped;
};

const prompt = ref("");

const { createAIProblem, isLoading, error } = useCreateAIProblem();

const handleGenerateProblem = async () => {
  if (!problemSetCategory.value) {
    alert("카테고리를 선택해주세요.");
    return;
  }
  if (!prompt.value.trim()) {
    alert("생성하고 싶은 문제 설명을 입력해주세요.");
    return;
  }

  const payload: AIProblemRequest = {
    category: problemSetCategory.value,
    detailPrompt: prompt.value.trim(),
  };

  // ✅ res.data가 AIProblem[] 이라고 확인했으니 그대로 씀
  const res = await createAIProblem(payload);
  console.log("문제 생성 완료: ", res.status);
  const aiProblems: AIProblem[] = res.data;

  const forms = normalizeAIProblems(aiProblems);
  if (!forms.length) {
    alert("AI가 생성한 문제를 저장할 수 없어요. (형식/필수값 누락)");
    return;
  }

  const savedId = await submitAllWithProblems(
    forms,
    problemSetTitle.value,
    problemSetCategory.value
  );
  createdProblemSetId.value = savedId;
  isCreatedModalOpen.value = true;
  //받아온 문제를 db에 넣기

  //문제 생성이 완료되었습니다. 모달창과 함께 문제 페이지로 이동하기
};
</script>

<template>
  <main class="min-h-screen bg-slate-50">
    <div class="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <!-- 생성 완료 모달 -->
      <div
        v-if="isCreatedModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      >
        <div class="w-full max-w-sm rounded-2xl bg-white p-5 shadow-lg">
          <h2 class="text-base font-semibold text-slate-900">
            문제 생성 완료 ✅
          </h2>
          <p class="mt-2 text-sm text-slate-600">
            AI 문제가 저장되었습니다. 문제 페이지로 이동할까요?
          </p>

          <div class="mt-5 flex gap-2 justify-end">
            <button
              type="button"
              class="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              @click="isCreatedModalOpen = false"
            >
              닫기
            </button>
            <button
              type="button"
              class="rounded-lg bg-primary-500 px-3 py-2 text-sm text-white hover:bg-primary-400"
              @click="goToProblemSet"
            >
              문제 페이지로 이동
            </button>
          </div>
        </div>
      </div>

      <!-- 헤더 -->
      <header class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-semibold text-slate-900">AI로 문제 만들기</h1>
          <p class="mt-1 text-xs text-slate-500">
            AI에게 원하는 문제를 요청해보세요
          </p>
        </div>
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
              v-for="cat in PROBLEM_SET_CATEGORY_OPTIONS"
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
        <div class="space-y-1.5">
          <Label class="text-xs font-medium text-slate-700">AI 요청</Label>
          <Input placeholder="어떤 문제를 생성하고 싶나요?" v-model="prompt" />
        </div>
      </section>
      <Button
        class="w-full"
        :disabled="isLoading"
        @click="handleGenerateProblem"
      >
        {{ isLoading ? "생성 중..." : "AI로 문제 생성하기" }}
      </Button>

      <FieldSeparator />
    </div>
  </main>
</template>
