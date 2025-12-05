<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Examples from "@/components/Examples.vue";
import LoginForm from "@/features/auth/ui/LoginForm.vue";
import AppHeader from "@/widgets/app-header/ui/AppHeader.vue";
import BottomNav from "@/widgets/bottom-nav/ui/BottomNav.vue";
</script>

<template>
  <div>
    <AppHeader />
    <main className="m-auto w-full max-w-175 border-x px-4 py-6 ">
      <h1>레이아웃페이지</h1>
      <LoginForm />
      <Examples />

      <RouterView />
    </main>
    <BottomNav />
  </div>
</template>
∏
<style scoped></style>
