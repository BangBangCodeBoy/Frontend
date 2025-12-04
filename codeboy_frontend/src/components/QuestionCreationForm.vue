<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { Field, FieldSeparator } from "@/components/ui/field";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
</script>

<template>
  <!-- 전체 영역 여백 + 세로 간격 -->
  <div class="space-y-6">
    <!-- 제목/라벨 영역 -->
    <div class="space-y-2">
      <!-- className -> class 로 수정 -->
      <Legend class="Subtitle2 text-sm font-medium text-foreground">
        문제 세트 이름
      </Legend>
      <InputGroup>
        <InputGroupTextarea
          placeholder="문제를 입력해주세요"
          class="min-h-[72px]"
        />
      </InputGroup>
    </div>

    <!-- 선지 + 정답 선택 -->
    <div class="space-y-3">
      <p class="text-sm font-medium text-muted-foreground">
        정답 보기를 선택해주세요
      </p>

      <RadioGroup class="flex flex-col gap-3" default-value="1">
        <!-- 1번 선지 -->
        <div class="flex items-start gap-3">
          <RadioGroupItem id="choice-1" value="1" class="mt-3" />
          <Label for="choice-1" class="flex-1 cursor-pointer">
            <InputGroup>
              <InputGroupTextarea
                placeholder="1번 선지를 작성해주세요"
                class="min-h-[56px]"
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
              />
            </InputGroup>
          </Label>
        </div>
      </RadioGroup>
    </div>

    <FieldSeparator />

    <!-- 버튼 영역: 위와 간격 + 오른쪽 정렬 -->
    <Field orientation="horizontal" class="mt-2 flex justify-end gap-3">
      <Button variant="outline" type="button"> 완성하기 </Button>
      <Button variant="default" type="submit"> 다음 문제 만들기 </Button>
    </Field>
  </div>
</template>

<style lang="scss" scoped></style>
