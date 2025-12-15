import { ApiResponse, ssafyApi } from "@/shared/api/api";
import { AxiosResponse } from "axios";
import { ref } from "vue";
import { AIProblemRequest, AIProblem } from "@/shared/api/generated";

export function useCreateAIProblem() {
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const createAIProblem = async (payload: AIProblemRequest) => {
    isLoading.value = true;
    error.value = null;

    console.log("AI문제 생성 요청 쿼리 : ", payload);
    try {
      const response: AxiosResponse<ApiResponse<AIProblem[]>> =
        await ssafyApi.generateProblems(payload);

      console.log("AI문제 생성  응답 상태 : ", response.data.status);

      if (response.data.status != "OK") {
        throw new Error(response.data.message ?? "AI문제 생성에 실패했습니다.");
      }
      return response.data;
    } catch (e: any) {
      console.log("AI문제 생성  수정 에러:", e);
      error.value =
        e instanceof Error
          ? e
          : new Error("AI문제 생성  중 에러가 발생했습니다.");
    } finally {
      isLoading.value = false;
    }
  };

  return {
    createAIProblem,
    isLoading,
    error,
  };
}
