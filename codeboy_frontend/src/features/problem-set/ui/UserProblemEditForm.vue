<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { Field, FieldSeparator } from "@/components/ui/field";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { UserProblemForm } from "@/features/problem-set/model/useProblemSetCreation";

const props = defineProps<{ modelValue: UserProblemForm }>();

const emit = defineEmits<{
  (e: "update:modelValue", value: UserProblemForm): void;
  (e: "save"): void;
  (e: "cancel"): void;
}>();

const updateField = <K extends keyof UserProblemForm>(
  key: K,
  value: UserProblemForm[K]
) => {
  emit("update:modelValue", { ...props.modelValue, [key]: value });
};
</script>

<template>
  <div
    class="w-full max-w-2xl bg-white border rounded-xl p-5 shadow-sm space-y-6"
  >
    <div class="space-y-2">
      <p class="Subtitle2 text-sm font-medium text-foreground">
        문제 내용 수정
      </p>
      <InputGroup>
        <InputGroupTextarea
          placeholder="문제를 입력해주세요"
          class="min-h-[72px]"
          :model-value="modelValue.problemDescription"
          @update:model-value="(v) => updateField('problemDescription', v)"
        />
      </InputGroup>
    </div>

    <div class="space-y-3">
      <p class="text-sm font-medium text-muted-foreground">
        정답 보기를 선택해주세요
      </p>

      <RadioGroup
        class="flex flex-col gap-3"
        :model-value="modelValue.answerChoice"
        @update:model-value="(v) => updateField('answerChoice', v)"
      >
        <div class="flex items-start gap-3">
          <RadioGroupItem id="choice-1" value="1" class="mt-3" />
          <Label for="choice-1" class="flex-1 cursor-pointer">
            <InputGroup>
              <InputGroupTextarea
                placeholder="1번 선지"
                class="min-h-[56px]"
                :model-value="modelValue.choice1"
                @update:model-value="(v) => updateField('choice1', v)"
              />
            </InputGroup>
          </Label>
        </div>

        <div class="flex items-start gap-3">
          <RadioGroupItem id="choice-2" value="2" class="mt-3" />
          <Label for="choice-2" class="flex-1 cursor-pointer">
            <InputGroup>
              <InputGroupTextarea
                placeholder="2번 선지"
                class="min-h-[56px]"
                :model-value="modelValue.choice2"
                @update:model-value="(v) => updateField('choice2', v)"
              />
            </InputGroup>
          </Label>
        </div>

        <div class="flex items-start gap-3">
          <RadioGroupItem id="choice-3" value="3" class="mt-3" />
          <Label for="choice-3" class="flex-1 cursor-pointer">
            <InputGroup>
              <InputGroupTextarea
                placeholder="3번 선지"
                class="min-h-[56px]"
                :model-value="modelValue.choice3"
                @update:model-value="(v) => updateField('choice3', v)"
              />
            </InputGroup>
          </Label>
        </div>

        <div class="flex items-start gap-3">
          <RadioGroupItem id="choice-4" value="4" class="mt-3" />
          <Label for="choice-4" class="flex-1 cursor-pointer">
            <InputGroup>
              <InputGroupTextarea
                placeholder="4번 선지"
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

    <Field orientation="horizontal" class="mt-2 flex justify-end gap-3">
      <Button variant="outline" type="button" @click="emit('cancel')"
        >취소</Button
      >
      <Button variant="default" type="button" @click="emit('save')"
        >수정 저장</Button
      >
    </Field>
  </div>
</template>
