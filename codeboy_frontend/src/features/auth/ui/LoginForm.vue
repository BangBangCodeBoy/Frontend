<script setup lang="ts">
import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";
</script>

<template>
  <div class="flex flex-col items-center px-6">
    <!-- title -->
    <span class="Title2 mb-8">Login</span>

    <!-- form area -->
    <div class="flex flex-col gap-4 w-full max-w-sm mb-8">
      <Input placeholder="ID" variant="gray" />
      <Input placeholder="Password" type="password" variant="gray" />
    </div>

    <!-- actions -->
    <div class="flex flex-col gap-3 w-full max-w-sm">
      <Button variant="default">Login</Button>
      <Button variant="outline">Sign up</Button>
    </div>
  </div>
</template>

<style scoped></style>
