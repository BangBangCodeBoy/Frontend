import { ApiResponse, ssafyApi } from "@/shared/api/api";
import { AxiosResponse } from "axios";
import { ref } from "vue";

type IncorrectNoteCreateRequest =
  | {
      userProblemId: number;
      isUserProblem: true;
    }
  | {
      problemId: number;
      isUserProblem: false;
    };

export const useAddIncorrectNote = () => {
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  //유저문제인지, 그냥 문제인지에 따라서 payload다르게 설정

  const fetchIncorrectNote = async (
    problemId: number,
    isUserProblem: boolean
  ) => {
    try {
      isLoading.value = true;
      error.value = null;

      let payload: IncorrectNoteCreateRequest;

      if (isUserProblem) {
        payload = {
          userProblemId: problemId,
          isUserProblem: true,
        };
      } else {
        payload = {
          problemId: problemId,
          isUserProblem: false,
        };
      }

      const res: AxiosResponse<ApiResponse<number>> =
        await ssafyApi.addIncorrectNote(payload);

      console.log("생성된 오답노트 id : ", res.data.data);

      if (res.data.status != "CREATED") {
        throw new Error(res.data.message ?? "오답노트 등록에 실패했습니다.");
      }
    } catch (e: any) {
      console.log("오답노트 등록 에러", e);
      error.value =
        e instanceof Error
          ? e
          : new Error("오답노트 등록 중 에러가 발생했습니다.");
    } finally {
      isLoading.value = false;
    }
  };
  return {
    fetchIncorrectNote,
    isLoading,
    error,
  };
};
