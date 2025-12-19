<script setup lang="ts">
import { SplashLogo } from "@/assets/icons/logo";
import LoginForm from "@/features/auth/ui/LoginForm.vue";
import { LoginRequest } from "@/shared/api/api";
import { useSessionStore } from "@/entities/session/model/sessionStore";

import { useRouter } from "vue-router";

const router = useRouter();
const sessionStore = useSessionStore();

async function handleLogin(payload: LoginRequest) {
  try {
    await sessionStore.login(payload);
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
