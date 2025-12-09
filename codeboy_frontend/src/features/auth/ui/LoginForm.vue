<script setup lang="ts">
import { ref } from "vue";
import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";

const emit = defineEmits<{
  (e: "submit", payload: { id: string; password: string }): void;
}>();

const id = ref("");
const password = ref("");

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
