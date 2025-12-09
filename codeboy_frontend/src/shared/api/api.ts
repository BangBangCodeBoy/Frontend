// src/shared/api/api.ts
import axios from "axios";
import { getSsafyApi } from "@/shared/api/generated";

// 백엔드 ApiResponse<T> 구조에 맞는 타입 정의 (수동)
export interface ApiResponse<T> {
  status: string; // HttpStatus를 문자열로 내려준다면 "OK", "UNAUTHORIZED" 등
  message: string | null;
  data: T | null;
}

// LoginFilter에서 내려주는 data DTO에 맞게
export interface LoginResponse {
  accessToken: string;
  memberId: number;
  id: string;
  nickname: string;
}

export interface LoginRequest {
  id: string;
  password: string;
}

// 공통 axios 인스턴스
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 예: http://localhost:8080
  withCredentials: true,
});

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
