<script setup lang="ts">
import { HeaderLogo } from "@/assets/icons/logo";
import { Profile } from "@/assets/icons/nav";
import { RouterLink } from "vue-router";
</script>

<template>
  <header
    class="w-full h-16 flex justify-between items-center px-3 bg-gray-0 border-b border-gray-200"
  >
    <RouterLink :to="{ name: 'home' }" class="flex items-center">
      <HeaderLogo
    /></RouterLink>
    <RouterLink
      :to="{ name: 'myPage' }"
      class="flex items-center justify-center rounded-full w-9 h-9"
      aria-label="마이페이지로 이동"
      ><Profile class="w-6 h-6"
    /></RouterLink>
  </header>
</template>

<style lang="scss" scoped></style>
