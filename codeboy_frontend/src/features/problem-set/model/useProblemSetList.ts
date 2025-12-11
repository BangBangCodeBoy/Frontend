import { ApiResponse, ssafyApi } from "@/shared/api/api";
import { AxiosResponse } from "axios";
import { UserProblemSet } from "@/shared/api/generated";
import { ref } from "vue";

export function useProblemSetList() {
  const problemSetList = ref<UserProblemSet[]>([]);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const fetchProblemList = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const response: AxiosResponse<ApiResponse<UserProblemSet[]>> =
        await ssafyApi.getAllUserProblemSets();

      console.log("문제 불러오기 응답 상태 : ", response.data.status);

      if (response.data.status != "OK" || !response.data.data) {
        throw new Error(
          response.data.message ?? "문제 리스트 조회에 실패했습니다."
        );
      }

      problemSetList.value = response.data.data;
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
    problemSetList,
    isLoading,
    error,
    fetchProblemList,
  };
}
