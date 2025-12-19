import { ApiResponse, ssafyApi } from "@/shared/api/api";
import { Comment, CommentUpdateRequest } from "@/shared/api/generated";
import { AxiosResponse } from "axios";
import { ref } from "vue";

export const useUpdateComment = () => {
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const fetchCommentUpdate = async (
    commentId: number,
    comment: CommentUpdateRequest
  ) => {
    try {
      isLoading.value = true;

      const res: AxiosResponse<ApiResponse<any>> = await ssafyApi.updateComment(
        commentId,
        comment
      );

      if (res.data.status != "OK") {
        throw new Error(res.data.message ?? "댓글 수정에 실패했습니다.");
      }
    } catch (e: any) {
      console.log("댓글 수정 에러", e);
      error.value =
        e instanceof Error ? e : new Error("댓글 수정 중 에러가 발생했습니다.");
    } finally {
      isLoading.value = false;
    }
  };
  return {
    fetchCommentUpdate,
    isLoading,
    error,
  };
};
