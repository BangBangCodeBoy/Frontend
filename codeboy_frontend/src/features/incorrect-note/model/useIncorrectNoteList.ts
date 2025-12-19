import { ApiResponse, ssafyApi } from "@/shared/api/api";
import { AxiosResponse, AxiosError } from "axios";
import { ref } from "vue";
import { IncorrectNoteResponse } from "@/shared/api/generated";

export const useIncorrectNoteList = () => {
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const incorrectNoteList = ref<IncorrectNoteResponse[]>([]);

  const fetchIncorrectList = async () => {
    try {
      incorrectNoteList.value = [];
      isLoading.value = true;

      const res: AxiosResponse<ApiResponse<IncorrectNoteResponse[]>> =
        await ssafyApi.getIncorrectNote();

      console.log("오답노트 리스트 불러오기: ", res.data.data);

      if (res.data.status != "OK" || !res.data.data) {
        throw new Error(
          res.data.message ?? "오답노트 리스트 조회에 실패했습니다."
        );
      }
      incorrectNoteList.value = res.data.data;
    } catch (e: any) {
      console.log("오답노트 리스트 조회 에러", e);

      // ✅ 404인 경우는 "오답노트 없음"으로 간주 → 에러로 취급하지 않음
      const axiosError = e as AxiosError<ApiResponse<IncorrectNoteResponse[]>>;
      const status = axiosError.response?.status;

      if (status === 404) {
        incorrectNoteList.value = [];
        error.value = null;
        return;
      }

      error.value =
        e instanceof Error
          ? e
          : new Error("오답노트 리스트 조회 중 에러가 발생했습니다.");
    } finally {
      isLoading.value = false;
    }
  };
  return {
    fetchIncorrectList,
    isLoading,
    error,
    incorrectNoteList,
  };
};
