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

const activeIndex = ref(0);

const tabs = [
  { label: "홈", defaultIcon: Home, activeIcon: OrangeHome },
  { label: "퀴즈방", defaultIcon: Hat, activeIcon: OrangeHat },
  { label: "랭킹", defaultIcon: Trophy, activeIcon: OrangeTrophy },
  { label: "오답노트", defaultIcon: Pencil, activeIcon: OrangePencil },
  { label: "마이페이지", defaultIcon: Profile, activeIcon: OrangeProfile },
];

const onSelect = (index: number) => {
  activeIndex.value = index;
  // 라우팅을 원하면 여기서 router.push() 하면 됨
};
</script>

<template>
  <nav class="w-full border-t bg-white">
    <ul class="flex justify-between w-full py-1">
      <li v-for="(tab, index) in tabs" :key="tab.label" class="flex-1">
        <button
          @click="onSelect(index)"
          class="w-full flex flex-col items-center gap-1 py-2"
        >
          <!-- 아이콘 -->
          <component
            :is="index === activeIndex ? tab.activeIcon : tab.defaultIcon"
          />

          <!-- 텍스트 -->
          <span
            class="Body2"
            :class="
              index === activeIndex ? 'text-primary-500' : 'text-gray-950'
            "
          >
            {{ tab.label }}
          </span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
