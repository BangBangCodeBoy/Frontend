<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Examples from "@/components/Examples.vue";
import BottomNav from "@/shared/components/ui/BottomNav.vue";
import Header from "@/shared/components/ui/Header.vue";
</script>

<template>
  <div>
    <header>
      <RouterLink :to="{ name: 'home' }">로고</RouterLink>
    </header>
    <main className="m-auto w-full max-w-175 border-x px-4 py-6 ">
      <Header />
      <h2>레이아웃페이지</h2>
      <Examples />
      <BottomNav />
      <RouterView />
    </main>
  </div>
</template>
∏
<style scoped></style>
