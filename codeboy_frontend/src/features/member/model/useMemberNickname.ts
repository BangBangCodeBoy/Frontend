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

const nicknameMap = ref<Record<number, string>>({});

export function useMemberNickname() {
  const isLoadingNickname = ref(false);
  const nicknameError = ref<Error | null>(null);

  // 조회된 회원 정보
  const member = ref<MemberInfo | null>(null);

  // 수정용 폼 상태
  const form = ref<MemberUpdateRequest>({
    email: "",
    nickname: "",
  });

  // UI 상태
  const isLoading = ref(false);
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

  const fetchNickname = async (memberId: number) => {
    if (nicknameMap.value[memberId]) return;

    isLoadingNickname.value = true;
    nicknameError.value = null;

    try {
      const response = await ssafyApi.getOneMemberInfo(memberId);
      nicknameMap.value[memberId] = response.data.data.nickname;
    } catch (e: any) {
      nicknameError.value =
        e instanceof Error
          ? e
          : new Error("닉네임 조회 중 에러가 발생했습니다.");
    } finally {
      isLoadingNickname.value = false;
    }
  };

  const getNickname = (memberId: number | undefined) => {
    if (!memberId) return "알 수 없음";
    return nicknameMap.value[memberId] ?? "닉네임 불러오는 중...";
  };

  return {
    fetchNickname,
    nicknameMap,
    nicknameError,
    getNickname,
    isLoadingNickname,
  };
}
