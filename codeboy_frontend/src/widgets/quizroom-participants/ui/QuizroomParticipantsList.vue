<!-- src/widgets/quizroom-participants/ui/QuizroomParticipantsList.vue -->
<script setup lang="ts">
import type { Participant } from "@/entities/participant/model/participant.type";
import ParticipantCard from "@/entities/participant/ui/ParticipantCard.vue";

const props = defineProps<{
  participants: Participant[];
}>();
</script>

<template>
  <div
    class="w-full bg-gray-50 rounded-lg border border-gray-200 p-4 mb-8 shadow-sm max-w-175"
  >
    <h3 class="Subtitle2 mb-3 text-gray-700">현재 참가자</h3>

    <TransitionGroup name="fade-slide" tag="div" class="flex flex-col gap-2">
      <ParticipantCard
        v-for="(p, idx) in participants"
        :key="p.id"
        :participant="p"
        :idx="idx"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
/* Fade + slide for appear animation */
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-slide-enter-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Leave animation */
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
