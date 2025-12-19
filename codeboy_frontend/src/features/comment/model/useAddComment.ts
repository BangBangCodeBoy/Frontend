import { ApiResponse, ssafyApi } from "@/shared/api/api";
import { Comment } from "@/shared/api/generated";
import { AxiosResponse } from "axios";
import { ref } from "vue";

export const useAddComment = () => {
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const fetchComment = async (problemSetId: number, comment: Comment) => {
    try {
      isLoading.value = true;

      const res: AxiosResponse<ApiResponse<Comment[]>> =
        await ssafyApi.addComment(problemSetId, comment);

      if (res.data.status != "CREATED") {
        throw new Error(res.data.message ?? "댓글 등록에 실패했습니다.");
      }
    } catch (e: any) {
      console.log("댓글 등록 에러", e);
      error.value =
        e instanceof Error ? e : new Error("댓글 등록 중 에러가 발생했습니다.");
    } finally {
      isLoading.value = false;
    }
  };
  return {
    fetchComment,
    isLoading,
    error,
  };
};
