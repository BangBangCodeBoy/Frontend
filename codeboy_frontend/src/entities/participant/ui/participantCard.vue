<!-- src/entities/participant/ui/ParticipantCard.vue -->
<script setup lang="ts">
import type { Participant } from "@/entities/participant/model/participant.type";

const props = defineProps<{
  participant: Participant;
  idx?: number;
}>();
</script>

<template>
  <div
    class="participant-card flex items-center justify-between bg-white border rounded-md px-3 py-2 relative floating"
    :style="{ animationDelay: `${(idx ?? 0) * 0.15}s` }"
  >
    <span class="Body2">{{ participant.name }}</span>

    <!-- HOST Badge -->
    <span
      v-if="participant.isHost"
      class="text-xs bg-yellow-400 text-black px-2 py-[2px] rounded-full font-semibold shadow-sm"
    >
      👑 Host
    </span>
  </div>
</template>

<style scoped>
/* 🔥 둥실둥실 떠다니는 애니메이션 */
.floating {
  animation: floating 2.8s ease-in-out infinite;
}

@keyframes floating {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
