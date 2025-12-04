<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
</script>

<template>
  <div>
    <Button variant="default" size="default" weight="bold">버튼1</Button>
    <Button variant="ghost">버튼3</Button>
    <Button variant="outline">버튼4</Button>
    <Button variant="secondary">버튼5</Button>
  </div>
  <div className="w-20">
    <Label for="email">Email</Label>
    <Input type="email" placeholder="email" />
  </div>

  <Input type="password" />
</template>

<style lang="scss" scoped></style>
