<script setup lang="ts">
import { SplashLogo } from "@/assets/icons/logo";
import LoginForm from "@/features/auth/ui/LoginForm.vue";

import { useAuthStore } from "@/features/auth/model/authStore";
import { ref } from "vue";

const auth = useAuthStore();

const id = ref("");
const password = ref("");

async function handleLogin() {
  try {
    await auth.login({
      id: id.value,
      password: password.value,
    });

    alert("로그인 성공!");
    // 라우터로 이동
    // router.push("/home");
  } catch (e) {
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
