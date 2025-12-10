// src/shared/api/api.ts
import axios from "axios";
import { getSsafyApi } from "@/shared/api/generated";
import { useSessionStore } from "@/entities/session/model/sessionStore";

// 백엔드 ApiResponse<T> 구조에 맞는 타입 정의 (수동)
export interface ApiResponse<T> {
  status: string; // HttpStatus를 문자열로 내려준다면 "OK", "UNAUTHORIZED" 등
  message: string | null;
  data: T | null;
}

// LoginFilter에서 내려주는 data DTO에 맞게
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  memberId: number;
}

export interface LoginRequest {
  id: string;
  password: string;
}

// 공통 axios 인스턴스
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

/**
 * ⭐ [핵심 추가] 자동 Authorization 헤더 부착 인터셉터
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const session = useSessionStore();
    const noAuthUrls = ["/login", "/api/join", "/auth/signup", "/member/join"];
    const token = session.accessToken;
    if (
      token &&
      config.url &&
      !noAuthUrls.some((url) => config.url!.startsWith(url))
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Swagger 기반 API들
const generatedApi = getSsafyApi();

// 로그인은 swagger에 없으니까 직접 추가
async function login(request: LoginRequest) {
  const res = await axiosInstance.post<ApiResponse<LoginResponse>>(
    "/login",
    request
  );
  return res;
}

export const ssafyApi = {
  ...generatedApi,
  login,
};
