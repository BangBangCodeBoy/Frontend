// src/stores/auth.ts
import { defineStore } from "pinia";
import { ssafyApi } from "@/shared/api/api";
import { LoginRequest } from "@/shared/api/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null as string | null,
    member: null as {
      memberId: number;
      id: string;
      nickname: string;
    } | null,
  }),

  actions: {
    async login(request: LoginRequest) {
      const response = await ssafyApi.login(request);
      const data = response.data; // ApiResponse<LoginResponse>

      if (data.status !== "OK") {
        throw new Error(data.message ?? "로그인 실패");
      }
      if (!data.data) {
        throw new Error("로그인 응답이 비어 있습니다.");
      }

      this.accessToken = data.data.accessToken;
      this.member = {
        memberId: data.data.memberId,
        id: data.data.id,
        nickname: data.data.nickname,
      };

      localStorage.setItem("accessToken", this.accessToken);
    },

    logout() {
      this.accessToken = null;
      this.member = null;
      localStorage.removeItem("accessToken");
    },
  },
});
