<script setup lang="ts">
import { SplashLogo } from "@/assets/icons/logo";
import LoginForm from "@/features/auth/ui/LoginForm.vue";
</script>

<template>
  <div class="bg-beige-100 flex flex-col items-center w-full min-h-screen">
    <SplashLogo />
    <LoginForm class="w-full" />
  </div>
</template>

<style scoped></style>
