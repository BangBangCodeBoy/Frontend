<script setup lang="ts">
import { ref } from "vue";
import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";

// 1) 부모에게 submit 이벤트를 전달하기 위한 emit 선언
const emit = defineEmits<{
  (e: "submit", payload: { id: string; password: string }): void;
}>();

// 2) 로컬 상태 생성
const id = ref("");
const password = ref("");

// 3) 로그인 버튼 클릭 시 실행할 함수
function onSubmit() {
  emit("submit", {
    id: id.value,
    password: password.value,
  });
}
</script>

<template>
  <div class="flex flex-col items-center px-6">
    <span class="Title2 mb-8">Login</span>

    <div class="flex flex-col gap-4 w-full max-w-sm mb-8">
      <!-- v-model 바인딩 -->
      <Input placeholder="ID" variant="gray" v-model="id" />
      <Input
        placeholder="Password"
        type="password"
        variant="gray"
        v-model="password"
      />
    </div>

    <div class="flex flex-col gap-3 w-full max-w-sm">
      <!-- submit emit 실행 -->
      <Button variant="default" @click="onSubmit">Login</Button>
      <Button variant="outline">Sign up</Button>
    </div>
  </div>
</template>
