import { ApiResponse, ssafyApi } from "@/shared/api/api";
import { AxiosResponse } from "axios";
import { UserProblem } from "@/shared/api/generated";
import { ref } from "vue";

export function useProblemSolvingList() {
  const problemList = ref<UserProblem[]>([]);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const fetchProblemList = async (problemSetId: number) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response: AxiosResponse<ApiResponse<UserProblem[]>> =
        await ssafyApi.getProblemsByUserProblemSetId(problemSetId);

      console.log("세트 문제 불러오기 응답 상태 : ", response.data.status);

      if (response.data.status != "OK" || !response.data.data) {
        throw new Error(
          response.data.message ?? "문제 리스트 조회에 실패했습니다."
        );
      }

      problemList.value = response.data.data;
    } catch (e: any) {
      console.log("문제 리스트 조회 에러:", e);
      error.value =
        e instanceof Error
          ? e
          : new Error("문제 리스트 조회 중 에러가 발생했습니다.");
    } finally {
      isLoading.value = false;
    }
  };

  return {
    problemList,
    isLoading,
    error,
    fetchProblemList,
  };
}
