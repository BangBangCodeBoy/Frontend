// src/features/member/model/useMemberProfile.ts
import { ref, onMounted } from "vue";
import { ssafyApi } from "@/shared/api/api";
import type { MemberUpdateRequest } from "@/shared/api/generated";
import type { AxiosResponse } from "axios";

export interface MemberInfo {
  id: string;
  email: string;
  nickname: string;
}

export function useMemberProfile() {
  // 조회된 회원 정보
  const member = ref<MemberInfo | null>(null);

  // 수정용 폼 상태
  const form = ref<MemberUpdateRequest>({
    email: "",
    nickname: "",
  });

  // UI 상태
  const isEditing = ref(false);
  const isLoading = ref(false);
  const isUpdating = ref(false);
  const errorMessage = ref<string | null>(null);
  const successMessage = ref<string | null>(null);

  // 회원 정보 조회
  async function fetchMember() {
    try {
      errorMessage.value = null;
      successMessage.value = null;
      isLoading.value = true;

      const response: AxiosResponse<any> = await ssafyApi.getMemberInfo();
      const data = response.data;

      if (data.status !== "OK" || !data.data) {
        throw new Error(data.message ?? "회원 정보를 불러오지 못했습니다.");
      }

      const { id, email, nickname } = data.data;

      member.value = { id, email, nickname };
      form.value = { email, nickname };
    } catch (e: any) {
      errorMessage.value = e?.message ?? "회원 조회 중 오류가 발생했습니다.";
    } finally {
      isLoading.value = false;
    }
  }

  // 진입 시 자동 조회
  onMounted(() => {
    void fetchMember();
  });

  function startEdit() {
    if (!member.value) return;
    isEditing.value = true;
    successMessage.value = null;
    errorMessage.value = null;

    form.value = {
      email: member.value.email,
      nickname: member.value.nickname,
    };
  }

  function cancelEdit() {
    isEditing.value = false;
    successMessage.value = null;
    errorMessage.value = null;

    if (member.value) {
      form.value = {
        email: member.value.email,
        nickname: member.value.nickname,
      };
    }
  }

  async function submitEdit() {
    if (!member.value) return;

    try {
      errorMessage.value = null;
      successMessage.value = null;
      isUpdating.value = true;

      const payload: MemberUpdateRequest = {
        email: form.value.email,
        nickname: form.value.nickname,
      };
      console.log("회원 정보 수정 요청 : ", payload);

      const response: AxiosResponse<any> = await ssafyApi.updateMember(payload);
      const data = response.data;

      if (data.status !== "OK") {
        throw new Error(data.message ?? "회원 정보 수정에 실패했습니다.");
      }

      const updated = data.data ?? payload;

      member.value = {
        id: member.value.id,
        email: updated.email ?? member.value.email,
        nickname: updated.nickname ?? member.value.nickname,
      };

      isEditing.value = false;
      successMessage.value = "회원 정보가 수정되었습니다.";
    } catch (e: any) {
      if (e.response?.data) {
        const data = e.response.data as any;
        errorMessage.value =
          data.message ?? e.message ?? "회원 정보 수정 중 오류가 발생했습니다.";
      } else {
        errorMessage.value =
          e?.message ?? "회원 정보 수정 중 오류가 발생했습니다.";
      }
    } finally {
      isUpdating.value = false;
    }
  }
  async function fetchNickname(memberId: number) {
    try {
      const response = await ssafyApi.getOneMemberInfo(memberId);
      return response.data.data.nickname;
    } catch {
      return "Unknown"; // fallback
    }
  }

  return {
    member,
    form,
    isEditing,
    isLoading,
    isUpdating,
    errorMessage,
    successMessage,
    fetchMember,
    fetchNickname,
    startEdit,
    cancelEdit,
    submitEdit,
  };
}
