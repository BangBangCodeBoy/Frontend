import { ApiResponse, ssafyApi } from "@/shared/api/api";
import { Comment } from "@/shared/api/generated";
import { AxiosResponse } from "axios";
import { ref } from "vue";

export const useDeleteComment = () => {
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const fetchCommentDelete = async (
    problemSetId: number,
    commentId: number
  ) => {
    try {
      isLoading.value = true;

      const res: AxiosResponse<ApiResponse<Comment[]>> =
        await ssafyApi.deleteComment(problemSetId, commentId);

      if (res.data.status != "OK") {
        throw new Error(res.data.message ?? "댓글 삭제에 실패했습니다.");
      }
    } catch (e: any) {
      console.log("댓글 삭제 에러", e);
      error.value =
        e instanceof Error ? e : new Error("댓글 삭제 중 에러가 발생했습니다.");
    } finally {
      isLoading.value = false;
    }
  };
  return {
    fetchCommentDelete,
    isLoading,
    error,
  };
};
