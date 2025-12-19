import { ApiResponse, ssafyApi } from "@/shared/api/api";
import { AxiosResponse } from "axios";
import { ref } from "vue";

export function useDeleteUserProblemSet() {
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const deleteUserProblemSet = async (UserProblemSetId: number) => {
    isLoading.value = true;
    error.value = null;
    console.log("삭제할 문제 세트 아이디", UserProblemSetId);
    try {
      const response: AxiosResponse<ApiResponse<void>> =
        await ssafyApi.deleteUserProblemSet(UserProblemSetId);

      if (response.data.status != "OK") {
        throw new Error(
          response.data.message ?? "유저 문제 세트 삭제에 실패했습니다."
        );
      }
    } catch (e: any) {
      console.log("유저 문제 세트 삭제 에러:", e);
      error.value =
        e instanceof Error
          ? e
          : new Error("유저 문제 세트 삭제 중 에러가 발생했습니다.");
    } finally {
      isLoading.value = false;
    }
  };

  return {
    deleteUserProblemSet,
    isLoading,
    error,
  };
}
