<!-- src/shared/ui/loading-dots/LoadingDots.vue -->
<script setup lang="ts"></script>

<template>
  <div class="loading-dots flex gap-1 mt-1">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
</template>

<style scoped>
.loading-dots .dot {
  width: 6px;
  height: 6px;
  background-color: #999;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.loading-dots .dot:nth-child(1) {
  animation-delay: -0.32s;
}
.loading-dots .dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
