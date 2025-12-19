<!-- src/features/problem-set/ui/QuestionCreationForm.vue -->
<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { Field, FieldSeparator } from "@/components/ui/field";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { UserProblemForm } from "@/features/problem-set/model/useProblemSetCreation";

// ✅ 부모에서 내려받을 props & emit
const props = defineProps<{
  modelValue: UserProblemForm;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: UserProblemForm): void;
  (e: "clickAdd"): void;
  (e: "clickSubmit"): void;
}>();

// 양방향 바인딩을 위한 헬퍼
const updateField = <K extends keyof UserProblemForm>(
  key: K,
  value: UserProblemForm[K]
) => {
  emit("update:modelValue", {
    ...props.modelValue,
    [key]: value,
  });
};
</script>

<template>
  <!-- 전체 영역 여백 + 세로 간격 -->
  <div class="space-y-6">
    <!-- 🔹 문제 내용 입력 -->
    <div class="space-y-2">
      <p class="Subtitle2 text-sm font-medium text-foreground">문제 내용</p>
      <InputGroup>
        <InputGroupTextarea
          placeholder="문제를 입력해주세요"
          class="min-h-[72px]"
          :model-value="modelValue.problemDescription"
          @update:model-value="(v) => updateField('problemDescription', v)"
        />
      </InputGroup>
    </div>

    <!-- 선지 + 정답 선택 -->
    <div class="space-y-3">
      <p class="text-sm font-medium text-muted-foreground">
        정답 보기를 선택해주세요
      </p>

      <RadioGroup
        class="flex flex-col gap-3"
        :model-value="modelValue.answerChoice"
        @update:model-value="(v) => updateField('answerChoice', v)"
      >
        <!-- 1번 선지 -->
        <div class="flex items-start gap-3">
          <RadioGroupItem id="choice-1" value="1" class="mt-3" />
          <Label for="choice-1" class="flex-1 cursor-pointer">
            <InputGroup>
              <InputGroupTextarea
                placeholder="1번 선지를 작성해주세요"
                class="min-h-[56px]"
                :model-value="modelValue.choice1"
                @update:model-value="(v) => updateField('choice1', v)"
              />
            </InputGroup>
          </Label>
        </div>

        <!-- 2번 선지 -->
        <div class="flex items-start gap-3">
          <RadioGroupItem id="choice-2" value="2" class="mt-3" />
          <Label for="choice-2" class="flex-1 cursor-pointer">
            <InputGroup>
              <InputGroupTextarea
                placeholder="2번 선지를 작성해주세요"
                class="min-h-[56px]"
                :model-value="modelValue.choice2"
                @update:model-value="(v) => updateField('choice2', v)"
              />
            </InputGroup>
          </Label>
        </div>

        <!-- 3번 선지 -->
        <div class="flex items-start gap-3">
          <RadioGroupItem id="choice-3" value="3" class="mt-3" />
          <Label for="choice-3" class="flex-1 cursor-pointer">
            <InputGroup>
              <InputGroupTextarea
                placeholder="3번 선지를 작성해주세요"
                class="min-h-[56px]"
                :model-value="modelValue.choice3"
                @update:model-value="(v) => updateField('choice3', v)"
              />
            </InputGroup>
          </Label>
        </div>

        <!-- 4번 선지 -->
        <div class="flex items-start gap-3">
          <RadioGroupItem id="choice-4" value="4" class="mt-3" />
          <Label for="choice-4" class="flex-1 cursor-pointer">
            <InputGroup>
              <InputGroupTextarea
                placeholder="4번 선지를 작성해주세요"
                class="min-h-[56px]"
                :model-value="modelValue.choice4"
                @update:model-value="(v) => updateField('choice4', v)"
              />
            </InputGroup>
          </Label>
        </div>
      </RadioGroup>
    </div>

    <FieldSeparator />

    <!-- 버튼 영역: 위와 간격 + 오른쪽 정렬 -->
    <Field orientation="horizontal" class="mt-2 flex justify-end gap-3">
      <!-- ✅ 완성하기 버튼 → submitAll -->
      <Button variant="outline" type="button" @click="emit('clickSubmit')">
        완성하기
      </Button>
      <!-- ✅ 문제 추가하기 버튼 → addCurrentProblem -->
      <Button variant="default" type="button" @click="emit('clickAdd')">
        문제 추가하기
      </Button>
    </Field>
  </div>
</template>

<style lang="scss" scoped></style>
