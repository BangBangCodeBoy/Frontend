<script setup lang="ts">
import { ref } from "vue";
import {
  Home,
  Hat,
  Trophy,
  Pencil,
  Profile,
  OrangeHat,
  OrangeHome,
  OrangePencil,
  OrangeProfile,
  OrangeTrophy,
} from "@/assets/icons/nav";
import { PATH } from "@/shared/constants/paths";
import router from "@/router";

const activeIndex = ref(0);

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
  // { label: "마이페이지", defaultIcon: Profile, activeIcon: OrangeProfile },
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
          <!-- 아이콘 -->
          <component
            :is="$route.name === tab.name ? tab.activeIcon : tab.defaultIcon"
          />

          <!-- 텍스트 -->
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
