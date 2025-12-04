<script setup lang="ts">
import type { NavigationMenuTriggerProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { ChevronDown } from "lucide-vue-next";
import { NavigationMenuTrigger, useForwardProps } from "reka-ui";
import { cn } from "@/lib/utils";
import { navigationMenuTriggerStyle } from ".";

const props = defineProps<
  NavigationMenuTriggerProps & {
    class?: HTMLAttributes["class"];
    active?: boolean;
  }
>();

const delegatedProps = reactiveOmit(props, "class");

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <NavigationMenuTrigger
    v-bind="forwardedProps"
    :data-state="props.active ? 'active' : undefined"
    :class="cn(navigationMenuTriggerStyle(), 'group', props.class)"
  >
    <slot />
  </NavigationMenuTrigger>
</template>
