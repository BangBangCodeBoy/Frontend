<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { QuizRoomCard } from "@/entities/quiz-room";
import { Reload } from "@/assets/icons";
import CreateRoomButton from "@/features/quiz-room/ui/CreateRoomButton.vue";

const rooms = [
  { id: 1, title: "알고리즘 스터디 1반", participants: 3, max: 8 },
  { id: 2, title: "CS 기본기 테스트", participants: 5, max: 10 },
];
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-center gap-4 justify-end">
      <Reload />
      <CreateRoomButton />
    </div>

    <QuizRoomCard
      v-for="room in rooms"
      :key="room.id"
      :title="room.title"
      :participants="room.participants"
      :max-participants="room.max"
      @click="() => console.log('참여하기 클릭', room.id)"
    />
  </div>
</template>
