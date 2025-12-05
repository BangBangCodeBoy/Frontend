<script setup lang="ts">
import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";
</script>

<template>
  <div class="flex flex-col items-center px-6 pt-20">
    <!-- title -->
    <span class="Title2 mb-10">Sign Up</span>

    <!-- form area -->
    <div class="flex flex-col gap-5 w-full max-w-sm mb-10">
      <div class="flex flex-col gap-1">
        <label class="Body2 text-gray-600">ID</label>
        <Input placeholder="ID를 입력해주세요." />
      </div>

      <div class="flex flex-col gap-1">
        <label class="Body2 text-gray-600">비밀번호</label>
        <Input placeholder="비밀번호를 입력해주세요" type="password" />
      </div>

      <div class="flex flex-col gap-1">
        <label class="Body2 text-gray-600">비밀번호 확인</label>
        <Input placeholder="비밀번호를 입력해주세요" type="password" />
      </div>

      <div class="flex flex-col gap-1">
        <label class="Body2 text-gray-600">닉네임</label>
        <Input placeholder="닉네임을 입력해주세요." />
      </div>

      <div class="flex flex-col gap-1">
        <label class="Body2 text-gray-600">Email</label>
        <Input placeholder="이메일을 입력해주세요" type="email" />
      </div>
    </div>

    <!-- actions -->
    <div class="w-full max-w-sm">
      <Button variant="default" class="w-full py-3">계정 만들기</Button>
    </div>
  </div>
</template>

<style scoped></style>
