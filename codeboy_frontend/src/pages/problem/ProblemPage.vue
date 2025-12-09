<script setup lang="ts">
const rooms = [
  {
    id: 1,
    title: "알고리즘 스터디 1반",
    type: "정보처리기사",
    nickname: 3,
    commentCount: 8,
  },
  { id: 2, title: "CS 기본기 테스트", type: "SQLD", participants: 5, max: 10 },
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

<style scoped></style>
