<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Examples from "@/components/Examples.vue";
</script>

<template>
  <div>
    <header>
      <RouterLink :to="{ name: 'home' }">로고</RouterLink>
    </header>
    <main className="m-auto w-full max-w-175 border-x px-4 py-6 ">
      <Examples />
      <RouterView />
    </main>
  </div>
</template>
∏
<style scoped></style>
