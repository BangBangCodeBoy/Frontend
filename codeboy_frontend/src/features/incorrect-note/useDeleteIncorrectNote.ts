import { ApiResponse, ssafyApi } from "@/shared/api/api";
import { AxiosResponse } from "axios";
import { ref } from "vue";

export const useDeleteIncorrectNote = () => {
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const fetchIncorrectNoteDelete = async (incorrectNoteId: number) => {
    try {
      isLoading.value = true;

      const res: AxiosResponse<ApiResponse<string>> =
        await ssafyApi.deleteIncorrectNote(incorrectNoteId);

      if (res.data.status != "OK") {
        throw new Error(res.data.message ?? "오답노트 삭제에 실패했습니다.");
      }
    } catch (e: any) {
      console.log("오답노트 삭제 에러", e);
      error.value =
        e instanceof Error
          ? e
          : new Error("오답노트 삭제 중 에러가 발생했습니다.");
    } finally {
      isLoading.value = false;
    }
  };
  return {
    fetchIncorrectNoteDelete,
    isLoading,
    error,
  };
};
