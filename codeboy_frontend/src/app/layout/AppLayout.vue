<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import AppHeader from "@/widgets/app-header/ui/AppHeader.vue";
import BottomNav from "@/widgets/bottom-nav/ui/BottomNav.vue";
import QuizRoomCard from "@/entities/quiz-room/ui/QuizRoomCard.vue";
import Examples from "@/components/Examples.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main className="m-auto w-full max-w-175 border-x px-4 py-6 flex-1 pb-20">
      <RouterView />
      <Examples />
    </main>
    <BottomNav />
  </div>
</template>

∏
<style scoped></style>
