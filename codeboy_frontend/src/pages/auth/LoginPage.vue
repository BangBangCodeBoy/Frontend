<script setup lang="ts">
import { SplashLogo } from "@/assets/icons/logo";
import LoginForm from "@/features/auth/ui/LoginForm.vue";
import { LoginRequest } from "@/shared/api/api";

import { useAuthStore } from "@/features/auth/model/authStore";
import { useRouter } from "vue-router";

const router = useRouter();

const auth = useAuthStore();

async function handleLogin(payload: LoginRequest) {
  try {
    await auth.login(payload); // 그대로 payload 전달 가능!

    router.push({ name: "home" });
  } catch (e: any) {
    alert("로그인 실패: " + e.message);
  }
}
</script>

<template>
  <div class="bg-beige-100 flex flex-col items-center w-full min-h-screen">
    <SplashLogo />
    <!-- @click="handleLogin" -->
    <LoginForm @submit="handleLogin" class="w-full" />
  </div>
</template>

<style scoped></style>
