import { ref } from "vue";
import { useRouter } from "vue-router";

import type { AIProblem, AIProblemRequest } from "@/shared/api/generated";
import { normalizeAIProblems } from "../lib/normalizeAIProblems";

import { useCreateAIProblem } from "@/features/problem-set/model/useCreateAIProblem";
import type { UserProblemSetCategory } from "@/shared/api/generated";

export const useAIProblemCreateFlow = (opts: {
  getTitle: () => string;
  getCategory: () => UserProblemSetCategory | null | undefined;
  submitAllWithProblems: (
    forms: any,
    title: string,
    category: UserProblemSetCategory
  ) => Promise<number>;
}) => {
  const router = useRouter();

  const prompt = ref("");
  const isCreatedModalOpen = ref(false);
  const createdProblemSetId = ref<number | null>(null);

  const { createAIProblem, isLoading, error } = useCreateAIProblem();

  const goToProblemSet = () => {
    const id = createdProblemSetId.value;
    if (!id) return;

    router.push({
      name: "problemSet",
      params: { id: String(id) }, // ✅ 안전
      query: { isOwn: "2" },
    });
  };

  const generateAndSave = async () => {
    const category = opts.getCategory();
    const title = opts.getTitle();

    if (!category) {
      alert("카테고리를 선택해주세요.");
      return;
    }
    if (!prompt.value.trim()) {
      alert("생성하고 싶은 문제 설명을 입력해주세요.");
      return;
    }
    if (!title.trim()) {
      alert("문제집 제목을 입력해주세요.");
      return;
    }

    const payload: AIProblemRequest = {
      category,
      detailPrompt: prompt.value.trim(),
    };

    const res = await createAIProblem(payload);

    // ✅ createAIProblem 구현 차이(배열/axiosResponse) 대응
    const aiProblems: AIProblem[] = Array.isArray(res)
      ? res
      : Array.isArray(res?.data)
      ? res.data
      : [];

    const forms = normalizeAIProblems(aiProblems);
    if (!forms.length) {
      alert("AI가 생성한 문제를 저장할 수 없어요. (형식/필수값 누락)");
      return;
    }

    const savedId = await opts.submitAllWithProblems(forms, title, category);
    createdProblemSetId.value = savedId;
    isCreatedModalOpen.value = true;
  };

  return {
    prompt,
    isLoading,
    error,
    isCreatedModalOpen,
    createdProblemSetId,
    generateAndSave,
    goToProblemSet,
    closeModal: () => (isCreatedModalOpen.value = false),
  };
};
