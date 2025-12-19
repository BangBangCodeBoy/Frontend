import { ApiResponse, ssafyApi } from "@/shared/api/api";
import { AxiosResponse } from "axios";
import { ref } from "vue";
import { UserProblem } from "@/shared/api/generated";

export function useUpdateUserProblem() {
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const updateUserProblem = async (
    UserProblemId: number,
    payload: UserProblem
  ) => {
    isLoading.value = true;
    error.value = null;

    console.log("업데이터 요청 쿼리 : ", payload);
    try {
      const response: AxiosResponse<ApiResponse<void>> =
        await ssafyApi.updateUserProblem(UserProblemId, payload);

      console.log("내가 만든 문제 불러오기 응답 상태 : ", response.data.status);

      if (response.data.status != "OK") {
        throw new Error(
          response.data.message ?? "유저 문제 수정에 실패했습니다."
        );
      }
    } catch (e: any) {
      console.log("유저 문제 수정 에러:", e);
      error.value =
        e instanceof Error
          ? e
          : new Error("유저 문제 수정 중 에러가 발생했습니다.");
    } finally {
      isLoading.value = false;
    }
  };

  return {
    updateUserProblem,
    isLoading,
    error,
  };
}
