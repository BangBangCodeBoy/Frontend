<script setup lang="ts">
import { FieldSeparator } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";

defineProps<{
  title: string;
  category: string | null;
  prompt: string;
  isLoading: boolean;
  categoryOptions: { value: string; label: string }[];
}>();

const emit = defineEmits<{
  (e: "update:title", v: string): void;
  (e: "update:category", v: string): void;
  (e: "update:prompt", v: string): void;
  (e: "submit"): void;
}>();
</script>

<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
    <div class="space-y-1.5">
      <Label class="text-xs font-medium text-slate-700">문제집 제목</Label>
      <InputGroup>
        <InputGroupInput
          placeholder="예: 2025 정보처리기사 1회 모의고사"
          :model-value="title"
          @update:model-value="emit('update:title', $event)"
        />
      </InputGroup>
    </div>

    <div class="space-y-1.5">
      <Label class="text-xs font-medium text-slate-700">카테고리</Label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="cat in categoryOptions"
          :key="cat.value"
          type="button"
          class="rounded-full border px-3 py-1 text-xs transition-colors"
          :class="
            category === cat.value
              ? 'border-primary-500 bg-primary-50 text-primary-600'
              : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
          "
          @click="emit('update:category', cat.value)"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <div class="space-y-1.5">
      <Label class="text-xs font-medium text-slate-700">AI 요청</Label>
      <Input
        placeholder="어떤 문제를 생성하고 싶나요?"
        :model-value="prompt"
        @update:model-value="(value) => emit('update:prompt', String(value))"
      />
    </div>
  </section>

  <Button class="w-full" :disabled="isLoading" @click="emit('submit')">
    {{ isLoading ? "생성 중..." : "AI로 문제 생성하기" }}
  </Button>

  <FieldSeparator />
</template>
