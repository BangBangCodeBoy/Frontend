<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";

// 테스트용 참가자 목록
const participants = [
  { id: 1, name: "현명", isHost: true },
  { id: 2, name: "지훈", isHost: false },
  { id: 3, name: "민수", isHost: false },
];

// 현재 사용자 역할
const isHost = true;
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center px-4">
    <!-- Title + 로딩 애니메이션 -->
    <div class="flex flex-col items-center mb-8">
      <h2 class="Subtitle1 mb-2">퀴즈방 대기 중...</h2>
      <div class="loading-dots flex gap-1 mt-1">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>

    <!-- 참가자 박스 -->
    <div
      class="w-full bg-gray-50 rounded-lg border border-gray-200 p-4 mb-8 shadow-sm max-w-175"
    >
      <h3 class="Subtitle2 mb-3 text-gray-700">현재 참가자</h3>

      <!-- TransitionGroup -->
      <TransitionGroup name="fade-slide" tag="div" class="flex flex-col gap-2">
        <div
          v-for="(p, idx) in participants"
          :key="p.id"
          class="participant-card flex items-center justify-between bg-white border rounded-md px-3 py-2 relative floating"
          :style="{ animationDelay: `${idx * 0.15}s` }"
        >
          <span class="Body2">{{ p.name }}</span>

          <!-- HOST Badge -->
          <span
            v-if="p.isHost"
            class="text-xs bg-yellow-400 text-black px-2 py-[2px] rounded-full font-semibold shadow-sm"
          >
            👑 Host
          </span>
        </div>
      </TransitionGroup>
    </div>

    <!-- Button Area -->
    <div class="w-full max-w-175 flex flex-col gap-3">
      <Button v-if="isHost" variant="default" class="w-full py-3">
        게임 시작하기
      </Button>

      <Button v-else variant="outline" class="w-full py-3">
        퀴즈방 나가기
      </Button>
    </div>
  </div>
</template>

<style scoped>
/* 점프하는 점 */
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

/* Highlight (입장 시 반짝) */
.participant-card {
  animation: highlight 0.6s ease-out;
}

@keyframes highlight {
  0% {
    background-color: #fff7b0;
  }
  100% {
    background-color: white;
  }
}

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
