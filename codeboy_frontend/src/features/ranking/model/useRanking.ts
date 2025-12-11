// src/features/ranking/model/useRanking.ts
import { ref, onMounted } from "vue";
import { ssafyApi } from "@/shared/api/api";
import type { UserScore } from "@/shared/api/generated";

import { useMemberProfile } from "@/features/member/model/useMemberProfile";
import { RankingMember } from "@/pages/ranking/model/types";

export function useRanking() {
  const top3 = ref<RankingMember[]>([]);
  const others = ref<RankingMember[]>([]);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);
  const { fetchNickname } = useMemberProfile();

  async function fetchScores() {
    try {
      isLoading.value = true;
      error.value = null;

      const res = await ssafyApi.getAllUserScores();
      const scores = res.data.data ?? [];

      const sorted = [...scores].sort(
        (a, b) => (b.score ?? 0) - (a.score ?? 0)
      );

      // 멤버 닉네임 매핑 (병렬 처리)
      const mapped = await Promise.all(
        sorted.map(async (item) => {
          const nickname = await fetchNickname(item.memberId!);
          return {
            nickname,
            score: item.score ?? 0,
          };
        })
      );

      top3.value = mapped.slice(0, 3);
      others.value = mapped.slice(3);
    } catch (e: unknown) {
      error.value = e instanceof Error ? e : new Error("Unknown Error");
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(() => {
    void fetchScores();
  });

  return {
    top3,
    others,
    isLoading,
    error,
    refetch: fetchScores,
  };
}
