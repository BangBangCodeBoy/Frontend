<script setup lang="ts">
import { useAuthStore } from "@/features/auth/model/authStore";
import SignupForm from "@/features/auth/ui/SignupForm.vue";
import { ssafyApi } from "@/shared/api/api";
import { useRouter } from "vue-router";
import { JoinRequest } from "@/shared/api/generated";

const router = useRouter();

async function handleSignup(payload: JoinRequest) {
  try {
    console.log("요청 값: ", payload);
    await ssafyApi.adminP(payload);
    router.push({ name: "home" });
  } catch (e: any) {
    alert("회원가입 실패:" + e.message);
  }
}
</script>

<template>
  <div class="bg-beige-100 flex flex-col items-center w-full min-h-screen">
    <SignupForm @submit="handleSignup" class="w-full" />
  </div>
</template>

<style scoped></style>
