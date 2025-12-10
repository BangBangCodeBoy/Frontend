// src/shared/stores/sessionStore.ts
import { defineStore } from "pinia";
import { ssafyApi } from "@/shared/api/api";
import type { LoginRequest, LoginResponse } from "@/shared/api/api";

export const useSessionStore = defineStore("session", {
  state: () => ({
    accessToken: null as string | null,
    refreshToken: null as string | null,
    memberId: null as number | null,
  }),

  actions: {
    async login(request: LoginRequest): Promise<LoginResponse> {
      const response = await ssafyApi.login(request);
      const data = response.data;

      if (data.status !== "OK" || !data.data) {
        throw new Error(data.message ?? "로그인 실패");
      }

      const { accessToken, refreshToken, memberId } = data.data;

      // Pinia state update → 자동으로 sessionStorage 반영됨
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.memberId = memberId;

      return data.data;
    },

    setToken(access: string, refresh?: string) {
      this.accessToken = access;
      if (refresh) this.refreshToken = refresh;
    },

    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      this.memberId = null;
    },
  },

  // persist 옵션을 sessionStorage로 강제
  persist: {
    storage: sessionStorage,
  },
});
