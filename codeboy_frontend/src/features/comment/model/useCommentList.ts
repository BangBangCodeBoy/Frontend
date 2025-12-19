import { ApiResponse, ssafyApi } from "@/shared/api/api";
import { Comment } from "@/shared/api/generated";
import { AxiosResponse } from "axios";
import { ref } from "vue";

export const useCommentList = () => {
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const commentList = ref<Comment[]>([]);

  const fetchCommentList = async (problemSetId: number) => {
    try {
      commentList.value = [];
      isLoading.value = true;

      const res: AxiosResponse<ApiResponse<Comment[]>> =
        await ssafyApi.getAllCommentsById(problemSetId);

      console.log("문제 리스트 불러오기: ", res.data.data);

      if (res.data.status != "OK" || !res.data.data) {
        throw new Error(res.data.message ?? "댓글 리스트 조회에 실패했습니다.");
      }
      commentList.value = res.data.data;
    } catch (e: any) {
      console.log("댓글 리스트 조회 에러", e);
      error.value =
        e instanceof Error
          ? e
          : new Error("댓글 리스트 조회 중 에러가 발생했습니다.");
    } finally {
      isLoading.value = false;
    }
  };
  return {
    fetchCommentList,
    isLoading,
    error,
    commentList,
  };
};
