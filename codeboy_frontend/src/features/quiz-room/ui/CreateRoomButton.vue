<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { Form, Field as VeeField } from "vee-validate";
import { h } from "vue";
import { toast } from "vue-sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
const formSchema = toTypedSchema(
  z.object({
    username: z
      .string()
      .nonempty({ message: "방 이름을 입력해주세요." })
      .min(2, { message: "방 이름은 2글자 이상이어야 합니다." })
      .max(50, { message: "방 이름은 50자 이내로 입력해주세요." }),
  })
);
function onSubmit(values: any) {
  toast("방 이름이 형식에 맞지 않습니다.:", {
    description: h(
      "pre",
      { class: "mt-2 w-[320px] rounded-md bg-neutral-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
    ),
  });
}
</script>

<template>
  <Form
    v-slot="{ handleSubmit }"
    as=""
    keep-values
    :validation-schema="formSchema"
  >
    <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline"> 방 만들기 </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>새 방 생성하기</DialogTitle>
        </DialogHeader>
        <form id="dialogForm" @submit="handleSubmit($event, onSubmit)">
          <FieldGroup>
            <VeeField v-slot="{ componentField, errors }" name="username">
              <Field :data-invalid="!!errors.length">
                <Input
                  id="username"
                  type="text"
                  placeholder="방 이름을 입력해주세요."
                  v-bind="componentField"
                />
                <p v-if="errors[0]" class="mt-1 text-xs text-red-500">
                  {{ errors[0] }}
                </p>

                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button type="submit" form="dialogForm"> 방 만들기 </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Form>
</template>

<style lang="scss" scoped></style>
