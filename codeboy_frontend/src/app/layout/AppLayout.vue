<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div>
    <header>
      <RouterLink :to="{ name: 'home' }">로고</RouterLink>
    </header>
    <main className="m-auto w-full max-w-175 border-x px-4 py-6 ">
      <RouterView />
    </main>
  </div>
</template>
∏
<style scoped></style>
