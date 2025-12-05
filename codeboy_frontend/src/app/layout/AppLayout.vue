<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Examples from "@/components/Examples.vue";
import BottomNav from "@/shared/components/ui/BottomNav.vue";
import Header from "@/shared/components/ui/Header.vue";
</script>

<template>
  <div>
    <Header />
    <main className="m-auto w-full max-w-175 border-x px-4 py-6 ">
      <h1>레이아웃페이지</h1>
      <Examples />

      <RouterView />
    </main>
    <BottomNav />
  </div>
</template>
∏
<style scoped></style>
