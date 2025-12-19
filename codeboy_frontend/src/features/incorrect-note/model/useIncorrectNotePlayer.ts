// src/features/incorrect-note/model/useIncorrectNotePlayer.ts
import { computed, onMounted, ref } from "vue";
import { useIncorrectNoteList } from "@/features/incorrect-note/model/useIncorrectNoteList";
import { useDeleteIncorrectNote } from "@/features/incorrect-note/model/useDeleteIncorrectNote";
import type {
  UserProblem,
  IncorrectNoteResponse,
} from "@/shared/api/generated";

export const useIncorrectNotePlayer = () => {
  const { fetchIncorrectList, isLoading, error, incorrectNoteList } =
    useIncorrectNoteList();
  const { fetchIncorrectNoteDelete } = useDeleteIncorrectNote();

  // 🔁 IncorrectNoteResponse[] → UserProblem[] 으로 변환
  const incorrectProblems = computed<UserProblem[]>(() =>
    incorrectNoteList.value.map((note: IncorrectNoteResponse) => ({
      userProblemId: note.incorrectNoteId,
      problemDescription: note.problemDescription ?? "",
      choice1: note.choice1 ?? "",
      choice2: note.choice2 ?? "",
      choice3: note.choice3 ?? "",
      choice4: note.choice4 ?? "",
      // answer가 "1", "2" 같은 보기 번호라고 가정
      answerChoice: note.answer ? Number(note.answer) : undefined,
      userProblemSetId: undefined,
    }))
  );

  const currentIndex = ref(0);
  const currentQuestion = computed(() => {
    return incorrectProblems.value[currentIndex.value] ?? null;
  });

  const totalCount = computed(() => incorrectProblems.value.length);
  const currentNumber = computed(() =>
    totalCount.value === 0 ? 0 : currentIndex.value + 1
  );

  const lastResult = ref<null | { correct: boolean; selectedIndex: number }>(
    null
  );

  onMounted(() => {
    fetchIncorrectList();
  });

  const handleAnswered = (payload: {
    correct: boolean;
    selectedIndex: number;
  }) => {
    lastResult.value = payload;
  };

  /**
   * 다음 문제로 이동
   * @returns true면 마지막 문제를 넘어간 상태(즉, 끝났음), false면 아직 남아 있음
   */
  const goNext = (): boolean => {
    if (currentIndex.value < incorrectProblems.value.length - 1) {
      currentIndex.value++;
      lastResult.value = null;
      return false; // 아직 문제 남음
    }
    // 더 이상 이동할 문제 없음
    return true;
  };

  /**
   * 현재 문제(오답노트) 삭제
   * @returns true면 전체 리스트가 비어버린 상태, false면 아직 남은 문제 있음
   */
  const deleteCurrent = async (): Promise<boolean> => {
    const current = currentQuestion.value;

    if (!current || !current.userProblemId) {
      return false;
    }

    // 1) 서버에 삭제 요청
    await fetchIncorrectNoteDelete(current.userProblemId);

    // 2) 로컬 리스트에서 제거
    const deleteIndex = currentIndex.value;
    incorrectNoteList.value.splice(deleteIndex, 1);

    // 3) 인덱스 보정 (마지막 요소 삭제 등)
    if (currentIndex.value >= incorrectProblems.value.length) {
      currentIndex.value = Math.max(incorrectProblems.value.length - 1, 0);
    }

    // 4) 정답/오답 상태 초기화
    lastResult.value = null;

    // 리스트가 완전히 비었는지 여부 반환
    return incorrectProblems.value.length === 0;
  };

  return {
    // 상태
    isLoading,
    error,
    incorrectProblems,
    currentQuestion,
    currentIndex,
    totalCount,
    currentNumber,
    lastResult,

    // 액션
    handleAnswered,
    goNext,
    deleteCurrent,
  };
};
