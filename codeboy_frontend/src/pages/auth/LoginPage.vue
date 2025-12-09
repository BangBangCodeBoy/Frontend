<script setup lang="ts">
import { SplashLogo } from "@/assets/icons/logo";
import LoginForm from "@/features/auth/ui/LoginForm.vue";

import { useAuthStore } from "@/features/auth/model/authStore";
import { useRouter } from "vue-router";

const router = useRouter();
import { ref } from "vue";

const auth = useAuthStore();

async function handleLogin(payload: { id: string; password: string }) {
  try {
    await auth.login({
      id: payload.id,
      password: payload.password,
    });

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
