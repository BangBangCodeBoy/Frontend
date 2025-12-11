// src/features/problem-set/model/useProblemSetCreation.ts
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import { Category } from "@/entities/types";
import { ssafyApi } from "@/shared/api/api";
import type { AxiosResponse } from "axios";
import type { ApiResponse } from "@/shared/api/api";

// 프론트에서 문제 한 개를 다루기 위한 폼 타입
export interface UserProblemForm {
  problemDescription: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  answerChoice: string; // "1" | "2" | "3" | "4"
}

// 공통 초기값
function createEmptyProblem(): UserProblemForm {
  return {
    problemDescription: "",
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
    answerChoice: "1",
  };
}

export function useProblemSetCreation() {
  const router = useRouter();

  // 🔹 문제집(세트) 메타 정보
  const problemSetTitle = ref("");
  const problemSetCategory = ref<Category | null>(null);

  // 🔹 현재 작성 중인 문제
  const currentProblem = ref<UserProblemForm>(createEmptyProblem());

  // 🔹 지금까지 추가한 문제 리스트
  const problems = ref<UserProblemForm[]>([]);

  // UI 상태
  const isSubmitting = ref(false);
  const errorMessage = ref<string | null>(null);
  const successMessage = ref<string | null>(null);

  const totalProblemCount = computed(() => problems.value.length);
  const displayProblemIndex = computed(
    () => problems.value.length + 1 // 현재 작성 중인 문제 번호
  );

  function resetCurrentProblem() {
    currentProblem.value = createEmptyProblem();
  }

  function validateCurrentProblem(): string | null {
    const p = currentProblem.value;
    if (!p.problemDescription.trim()) return "문제 내용을 입력해주세요.";
    if (!p.choice1.trim()) return "1번 선지를 입력해주세요.";
    if (!p.choice2.trim()) return "2번 선지를 입력해주세요.";
    if (!p.choice3.trim()) return "3번 선지를 입력해주세요.";
    if (!p.choice4.trim()) return "4번 선지를 입력해주세요.";
    if (!["1", "2", "3", "4"].includes(p.answerChoice))
      return "정답 보기를 선택해주세요.";
    return null;
  }

  function validateMeta(): string | null {
    if (!problemSetTitle.value.trim()) return "문제집 제목을 입력해주세요.";
    if (!problemSetCategory.value) return "카테고리를 선택해주세요.";
    return null;
  }

  // 🔸 “문제 추가하기” 버튼: 현재 문제를 리스트에 push + 폼 초기화
  function addCurrentProblem() {
    errorMessage.value = null;
    successMessage.value = null;

    const metaError = validateMeta();
    if (metaError) {
      errorMessage.value = metaError;
      return;
    }

    const problemError = validateCurrentProblem();
    if (problemError) {
      errorMessage.value = problemError;
      return;
    }

    problems.value.push({ ...currentProblem.value });
    resetCurrentProblem();
    successMessage.value = "문제가 추가되었습니다.";
  }

  // 🔸 “완성하기” 버튼: (현재 문제도 등록 대상에 포함) → 세트 생성 → 문제 목록 생성 → problems 페이지로 이동
  async function submitAll() {
    errorMessage.value = null;
    successMessage.value = null;

    const metaError = validateMeta();
    if (metaError) {
      errorMessage.value = metaError;
      return;
    }

    const problemError = validateCurrentProblem();
    if (problemError) {
      errorMessage.value = problemError;
      return;
    }

    const allProblems: UserProblemForm[] = [
      ...problems.value,
      { ...currentProblem.value },
    ];

    if (allProblems.length === 0) {
      errorMessage.value = "최소 1개 이상의 문제를 만들어야 합니다.";
      return;
    }

    try {
      isSubmitting.value = true;

      // 1) 문제 세트 생성
      const problemSetPayload = {
        problemSetTitle: problemSetTitle.value,
        createdAt: dayjs().toISOString(), // Timestamp -> swagger에서 string이면 이렇게
        category: problemSetCategory.value,
      };

      const setRes: AxiosResponse<ApiResponse<number>> =
        await ssafyApi.createMyUserProblemSet(problemSetPayload as any);

      if (setRes.data.status !== "CREATED" || !setRes.data.data) {
        throw new Error(
          setRes.data.message ?? "문제 세트 생성에 실패했습니다."
        );
      }

      const userProblemSetId = setRes.data.data;
      console.log("문제세트 생성. userProblemSetId: ", userProblemSetId);

      // 2) 세트에 문제들 일괄 등록
      const problemPayload = allProblems.map((p) => ({
        problemDescription: p.problemDescription,
        choice1: p.choice1,
        choice2: p.choice2,
        choice3: p.choice3,
        choice4: p.choice4,
        answerChoice: Number(p.answerChoice),
        userProblemSetId,
      }));

      console.log("등록하는 문제 정보 : ", problemPayload);

      const probRes: AxiosResponse<ApiResponse<void>> =
        await ssafyApi.createUserProblems(userProblemSetId, problemPayload);

      if (probRes.data.status !== "CREATED" && probRes.data.status !== "OK") {
        throw new Error(probRes.data.message ?? "문제 등록에 실패했습니다.");
      }

      successMessage.value = "문제 세트가 성공적으로 등록되었습니다.";

      // 3) 문제 목록 페이지로 이동
      router.push({ name: "problems" });
    } catch (e: any) {
      errorMessage.value =
        e?.message ?? "문제 세트 등록 중 알 수 없는 오류가 발생했습니다.";
    } finally {
      isSubmitting.value = false;
    }
  }

  return {
    // meta
    problemSetTitle,
    problemSetCategory,
    // problems
    currentProblem,
    problems,
    totalProblemCount,
    displayProblemIndex,
    // ui
    isSubmitting,
    errorMessage,
    successMessage,
    // actions
    addCurrentProblem,
    submitAll,
  };
}
