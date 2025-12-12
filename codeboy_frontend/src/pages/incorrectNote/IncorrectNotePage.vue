<script setup lang="ts">
import { useIncorrectNoteList } from "@/features/incorrect-note/model/useIncorrectNoteList";
import { onMounted } from "vue";

const { fetchIncorrectList, isLoading, error, incorrectNoteList } =
  useIncorrectNoteList();

onMounted(() => {
  fetchIncorrectList();
});
</script>
<template>
  <div class="flex flex-col justify-center items-center px-4 py-4 gap-5 w-full">
    <!-- 로딩 표시 -->
    <p v-if="isLoading" class="Body2 text-gray-500">
      오답노트를 불러오는 중...
    </p>

    <!-- 에러 표시 -->
    <p v-else-if="error" class="Body2 text-red-500">
      오류가 발생했습니다: {{ error.message }}
    </p>

    <!-- 오답노트 리스트 -->
    <template v-else>
      <div
        v-if="incorrectNoteList.length > 0"
        class="w-full flex flex-col gap-3"
      >
        <div
          v-for="note in incorrectNoteList"
          :key="note.incorrectNoteId"
          class="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        >
          <!-- 문제 내용 -->
          <p class="font-semibold text-sm text-gray-900 mb-2">
            {{ note.problemDescription }}
          </p>

          <!-- 선택지 -->
          <ul class="text-xs text-gray-700 space-y-1 mb-2">
            <li v-if="note.choice1">① {{ note.choice1 }}</li>
            <li v-if="note.choice2">② {{ note.choice2 }}</li>
            <li v-if="note.choice3">③ {{ note.choice3 }}</li>
            <li v-if="note.choice4">④ {{ note.choice4 }}</li>
          </ul>

          <!-- 정답 / 카테고리 -->
          <div
            class="flex justify-between items-center text-[11px] text-gray-500"
          >
            <span v-if="note.answer"> 정답: {{ note.answer }} </span>
            <span v-if="note.category"> 카테고리: {{ note.category }} </span>
          </div>
        </div>
      </div>

      <!-- 오답노트 없을 때 -->
      <p v-else class="Body2 text-gray-500">아직 저장된 오답노트가 없습니다.</p>
    </template>
  </div>
</template>
