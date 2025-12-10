<script setup lang="ts">
import SignupForm from "@/features/auth/ui/SignupForm.vue";
import { ssafyApi } from "@/shared/api/api";
import { useRouter } from "vue-router";
import { JoinRequest } from "@/shared/api/generated";

const router = useRouter();

async function handleSignup(payload: JoinRequest) {
  try {
    await ssafyApi.adminP(payload);
    alert("회원가입 성공:");
    router.push({ name: "login" });
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
