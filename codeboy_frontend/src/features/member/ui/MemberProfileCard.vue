<!-- src/features/member/ui/MemberProfileCard.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { useMemberProfile } from "@/features/member/model/useMemberProfile";

const {
  member,
  form,
  isEditing,
  isLoading,
  isUpdating,
  errorMessage,
  successMessage,
  startEdit,
  cancelEdit,
  submitEdit,
} = useMemberProfile();

const avatarText = computed(() => {
  if (member.value?.nickname) return member.value.nickname[0];
  if (member.value?.id) return member.value.id[0];
  return "?";
});
</script>

<template>
  <section class="w-full max-w-2xl mx-auto">
    <!-- 메시지 영역 -->
    <div class="space-y-2 mb-4">
      <p
        v-if="errorMessage"
        class="text-sm rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-700"
      >
        {{ errorMessage }}
      </p>
      <p
        v-if="successMessage"
        class="text-sm rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-700"
      >
        {{ successMessage }}
      </p>
    </div>

    <!-- 로딩 상태 -->
    <div
      v-if="isLoading"
      class="flex items-center justify-center rounded-2xl border border-slate-200 bg-white py-10 text-slate-500"
    >
      회원 정보를 불러오는 중입니다...
    </div>

    <!-- 회원 정보 카드 -->
    <div
      v-else-if="member"
      class="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-indigo-50/70 shadow-sm p-6 space-y-5"
    >
      <!-- 헤더 영역 -->
      <header class="flex items-center gap-4">
        <div
          class="flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-white text-xl font-bold shadow-md"
        >
          {{ avatarText }}
        </div>

        <div class="flex-1">
          <h2 class="text-lg font-semibold text-slate-900">
            {{ member.nickname || "닉네임 없음" }}
          </h2>
          <p class="text-sm text-slate-600">
            {{ member.email }}
          </p>
          <p class="mt-0.5 text-xs text-slate-400">ID: {{ member.id }}</p>
        </div>

        <button
          v-if="!isEditing"
          type="button"
          class="inline-flex items-center rounded-full border border-primary-500 px-3 py-1.5 text-xs font-medium text-primary-600 hover:bg-indigo-50 transition-colors"
          @click="startEdit"
        >
          프로필 수정
        </button>
      </header>

      <div class="border-t border-slate-200 pt-4">
        <!-- 읽기 모드 -->
        <div v-if="!isEditing" class="grid gap-3 text-sm">
          <div class="flex justify-between">
            <span class="text-slate-500">아이디</span>
            <span class="font-medium text-slate-900">
              {{ member.id }}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">이메일</span>
            <span class="font-medium text-slate-900">
              {{ member.email }}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">닉네임</span>
            <span class="font-medium text-slate-900">
              {{ member.nickname }}
            </span>
          </div>
        </div>

        <!-- 수정 모드 -->
        <form v-else class="space-y-4" @submit.prevent="submitEdit">
          <div class="space-y-1.5">
            <label class="text-xs font-medium text-slate-600"> 아이디 </label>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-medium text-slate-600"> 이메일 </label>
            <input
              v-model="form.email"
              type="email"
              class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-medium text-slate-600"> 닉네임 </label>
            <input
              v-model="form.nickname"
              type="text"
              class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button
              type="button"
              class="inline-flex items-center rounded-full border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              @click="cancelEdit"
            >
              취소
            </button>
            <button
              type="submit"
              class="inline-flex items-center rounded-full bg-primary-500 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              :disabled="isUpdating"
            >
              {{ isUpdating ? "수정 중..." : "저장" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- member 없음 -->
    <p v-else class="mt-6 text-center text-sm text-slate-500">
      표시할 회원 정보가 없습니다.
    </p>
  </section>
</template>
