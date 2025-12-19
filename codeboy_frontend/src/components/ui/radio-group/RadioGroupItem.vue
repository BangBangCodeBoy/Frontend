<script setup lang="ts">
import type { RadioGroupItemProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { Check } from "lucide-vue-next";
import { RadioGroupIndicator, RadioGroupItem, useForwardProps } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<
  RadioGroupItemProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = reactiveOmit(props, "class");

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <RadioGroupItem
    v-bind="forwardedProps"
    :class="
      cn(
        'peer aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:border-primary-500',
        props.class
      )
    "
  >
    <RadioGroupIndicator class="flex items-center justify-center">
      <span class="block h-2 w-2 rounded-full bg-primary-500" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
