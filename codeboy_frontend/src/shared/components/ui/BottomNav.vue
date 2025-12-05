<script setup lang="ts">
import {
  Home,
  Hat,
  Trophy,
  Pencil,
  OrangeHat,
  OrangeHome,
  OrangePencil,
  OrangeTrophy,
} from "@/assets/icons/nav";

const tabs = [
  { label: "홈", defaultIcon: Home, activeIcon: OrangeHome, name: "home" },
  {
    label: "문제집",
    defaultIcon: Hat,
    activeIcon: OrangeHat,
    name: "problems",
  },
  {
    label: "랭킹",
    defaultIcon: Trophy,
    activeIcon: OrangeTrophy,
    name: "ranking",
  },
  {
    label: "오답노트",
    defaultIcon: Pencil,
    activeIcon: OrangePencil,
    name: "incorrectNotes",
  },
];
</script>

<template>
  <nav class="w-full border-t bg-gray-0 fixed bottom-0 left-0 right-0 z-50">
    <ul class="flex justify-between w-full py-1">
      <li v-for="(tab, index) in tabs" :key="tab.label" class="flex-1">
        <router-link
          :to="{ name: tab.name }"
          class="w-full flex flex-col items-center gap-1 py-2"
        >
          <component
            :is="$route.name === tab.name ? tab.activeIcon : tab.defaultIcon"
          />

          <span
            class="Body2"
            :class="
              $route.name === tab.name ? 'text-primary-500' : 'text-gray-950'
            "
          >
            {{ tab.label }}
          </span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
