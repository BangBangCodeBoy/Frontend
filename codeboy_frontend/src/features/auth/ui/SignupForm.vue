<script setup lang="ts">
import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";
import { JoinRequest } from "@/shared/api/generated";
import { ref } from "vue";

const emit = defineEmits<{
  (e: "submit", payload: JoinRequest): void;
}>();

const id = ref("");
const password = ref("");
const passwordCheck = ref("");
const nickname = ref("");
const email = ref("");

function isValidEmail(value: string) {
  // RFC 5322를 단순화한 실무용 정규식
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(value);
}

// 회원가입 제출
function onSubmit() {
  // 이메일 유효성 검사
  if (!isValidEmail(email.value)) {
    alert("올바른 이메일 형식을 입력해주세요.");
    return;
  }
  // 패스워드 확인 체크
  if (password.value !== passwordCheck.value) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  const payload: JoinRequest = {
    id: id.value,
    password: password.value,
    nickname: nickname.value,
    email: email.value,
  };

  emit("submit", payload);
}
</script>

<template>
  <div class="flex flex-col items-center px-6 pt-20">
    <!-- title -->
    <span class="Title2 mb-10">Sign Up</span>

    <!-- form area -->
    <div class="flex flex-col gap-5 w-full max-w-sm mb-10">
      <div class="flex flex-col gap-1">
        <Input placeholder="ID" variant="gray" v-model="id" />
      </div>

      <div class="flex flex-col gap-1">
        <Input
          placeholder="비밀번호"
          type="password"
          variant="gray"
          v-model="password"
        />
      </div>

      <div class="flex flex-col gap-1">
        <Input
          placeholder="비밀번호 확인"
          type="password"
          variant="gray"
          v-model="passwordCheck"
        />
      </div>

      <div class="flex flex-col gap-1">
        <Input placeholder="닉네임" variant="gray" v-model="nickname" />
      </div>

      <div class="flex flex-col gap-1">
        <Input
          placeholder="이메일"
          type="email"
          variant="gray"
          v-model="email"
        />
      </div>
    </div>

    <!-- actions -->
    <div class="w-full max-w-sm">
      <Button variant="default" class="w-full py-3" @click="onSubmit"
        >계정 만들기</Button
      >
    </div>
  </div>
</template>

<style scoped></style>
