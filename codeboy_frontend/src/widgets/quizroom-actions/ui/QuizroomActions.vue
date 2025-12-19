<!-- src/widgets/quizroom-actions/ui/QuizroomActions.vue -->
<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";

const props = defineProps<{
  isHost: boolean;
}>();
</script>

<template>
  <div class="w-full max-w-175 flex flex-col gap-3">
    <Button v-if="isHost" variant="default" class="w-full py-3">
      게임 시작하기
    </Button>

    <Button v-else variant="outline" class="w-full py-3">
      퀴즈방 나가기
    </Button>
  </div>
</template>
