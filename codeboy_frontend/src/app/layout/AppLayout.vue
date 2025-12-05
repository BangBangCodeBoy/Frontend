<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Examples from "@/components/Examples.vue";
import LoginForm from "@/features/auth/ui/LoginForm.vue";
import AppHeader from "@/widgets/app-header/ui/AppHeader.vue";
import BottomNav from "@/widgets/bottom-nav/ui/BottomNav.vue";
import SignInForm from "@/features/auth/ui/SignInForm.vue";
import SignUpForm from "@/features/auth/ui/SignUpForm.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main className="m-auto w-full max-w-175 border-x px-4 py-6 flex-1 pb-20">
      <RouterView />
    </main>
    <BottomNav />
  </div>
</template>

∏
<style scoped></style>
