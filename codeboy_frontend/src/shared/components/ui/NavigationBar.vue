<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Hat, Home, Pencil, Profile, Trophy } from "@/assets/icons/nav";
</script>

<template>
  <div>
    <nav class="w-full border-t bg-white">
      <NavigationMenu class="w-full">
        <NavigationMenuList class="flex w-full justify-between">
          <NavigationMenuItem>
            <NavigationMenuTrigger class="nav-trigger" :active="true">
              <Home class="nav-icon" />
              <span class="nav-label">홈</span>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger class="nav-trigger" :active="true">
              <Hat class="nav-icon" />
              <span class="nav-label">퀴즈방</span>
            </NavigationMenuTrigger>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger class="nav-trigger" :active="true">
              <Trophy class="nav-icon" />
              <span class="nav-label">랭킹</span>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger class="nav-trigger" :active="true">
              <Pencil class="nav-icon" />
              <span class="nav-label">오답노트</span>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger class="nav-trigger" :active="true">
              <Profile class="nav-icon" />
              <span class="nav-label">마이페이지</span>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
:deep(.nav-trigger) {
  /* 기본 상태: 아이콘+텍스트 세로 정렬 + 기본 색 */
  @apply flex flex-col items-center gap-1 h-auto px-3 py-2 text-xs Body2;
}

.nav-trigger .nav-icon {
  /* 아이콘 기본 크기 + 색 */
  /* @apply w-10 h-10; */
}

.nav-trigger .nav-label {
  /* 텍스트 기본색은 nav-trigger의 text-gray-500을 따라감 */
}

/* ⭐ 선택(열림) 상태에서 색 바꾸기 */
:deep(.group[data-state="active"]) {
  @apply text-primary-500;
}

:deep(.group[data-state="active"] svg) {
  @apply text-primary-500 stroke-primary-500;
}
</style>
