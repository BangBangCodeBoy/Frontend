<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import UserProblemCard from "@/widgets/user-problem-card/ui/UserProblemCard.vue";
import UserProblemEditForm from "@/features/problem-set/ui/UserProblemEditForm.vue";
import Button from "@/components/ui/button/Button.vue";
import { useRoute, useRouter } from "vue-router";
import { useProblemSolvingList } from "@/features/problem-set/model/useProblemSolvingList";
import { useAddIncorrectNote } from "@/features/incorrect-note/model/useAddIncorrectNote";
import type { UserProblem } from "@/shared/api/generated";
import {
  useUpdateUserProblem,
  useDeleteUserProblem,
  useDeleteUserProblemSet,
} from "@/features/problem-set/model";

const { updateUserProblem } = useUpdateUserProblem();
const { deleteUserProblem } = useDeleteUserProblem();
const { deleteUserProblemSet } = useDeleteUserProblemSet();

const route = useRoute();
const router = useRouter();

const { problemList, isLoading, error, fetchProblemList } =
  useProblemSolvingList();

const problemSetId = Number(route.params.id);

// ✅ 마이페이지에서 query로 내려준 값
const isOwn = computed(() => route.query.isOwn === "1");

const { fetchIncorrectNote } = useAddIncorrectNote();

const currentIndex = ref(0);
const currentQuestion = computed(() => {
  return problemList.value?.[currentIndex.value] ?? null;
});

const lastResult = ref<null | { correct: boolean; selectedIndex: number }>(
  null
);

export interface UserProblemForm {
  problemDescription: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  answerChoice: string;
}

const isEditing = ref(false);
const editForm = ref<UserProblemForm>({
  problemDescription: "",
  choice1: "",
  choice2: "",
  choice3: "",
  choice4: "",
  answerChoice: "1",
});

watch(currentQuestion, (q) => {
  if (!q) return;
  isEditing.value = false;
  editForm.value = toForm(q);
});

onMounted(() => {
  fetchProblemList(problemSetId);
});

const handleAnswered = async (payload: {
  correct: boolean;
  selectedIndex: number;
}) => {
  if (isEditing.value) return;

  lastResult.value = payload;

  if (!payload.correct && currentQuestion.value) {
    await fetchIncorrectNote(currentQuestion.value.userProblemId, true);
  }
};

const goNext = () => {
  if (isEditing.value) return;

  if (currentIndex.value < problemList.value.length - 1) {
    currentIndex.value++;
    lastResult.value = null;
  } else {
    router.push({
      name: "problemSetComments",
      params: { problemSetId },
    });
  }
};

const startEdit = () => {
  if (!isOwn.value || !currentQuestion.value) return;
  isEditing.value = true;
  lastResult.value = null;
};

const cancelEdit = () => {
  isEditing.value = false;
  if (currentQuestion.value) editForm.value = toForm(currentQuestion.value);
};

const saveEdit = async () => {
  if (!currentQuestion.value) return;

  const updated: UserProblem = {
    ...currentQuestion.value,
    ...toApi(editForm.value),
  };

  await updateUserProblem(currentQuestion.value.userProblemId, updated);

  // 로컬 반영
  problemList.value[currentIndex.value] = updated;
  isEditing.value = false;
};

// -----------------------------
// ✅ Confirm Modal (문제 삭제 vs 세트 삭제) 분기
// -----------------------------
type ConfirmType = "problem" | "problemSet" | "problemLast";

const confirmOpen = ref(false);
const confirmType = ref<ConfirmType>("problem");

const confirmTitle = computed(() => {
  switch (confirmType.value) {
    case "problem":
      return "이 문제를 삭제할까요?";
    case "problemLast":
      return "마지막 문제를 삭제할까요?";
    case "problemSet":
      return "문제 세트를 삭제할까요?";
  }
});

const confirmDesc = computed(() => {
  switch (confirmType.value) {
    case "problem":
      return "삭제하면 되돌릴 수 없어요.";
    case "problemLast":
      return "마지막 문제를 삭제하면 문제 세트가 삭제됩니다.";
    case "problemSet":
      return "세트 안의 모든 문제가 함께 삭제될 수 있어요. 되돌릴 수 없어요.";
  }
});

const openConfirm = (type: ConfirmType) => {
  if (!isOwn.value) return;

  // ✅ 현재 문제 삭제를 누른 경우, 마지막 문제인지 검사
  if (type === "problem") {
    const isLastOne = problemList.value.length === 1;
    confirmType.value = isLastOne ? "problemLast" : "problem";
  } else {
    confirmType.value = type;
  }

  confirmOpen.value = true;
};

const closeConfirm = () => {
  confirmOpen.value = false;
};

const onConfirmDelete = async () => {
  try {
    if (confirmType.value === "problem") {
      if (!currentQuestion.value) return;

      await deleteUserProblem(currentQuestion.value.userProblemId);

      problemList.value.splice(currentIndex.value, 1);
      lastResult.value = null;
      isEditing.value = false;

      if (problemList.value.length === 0) {
        router.push({ name: "problemSetComments", params: { problemSetId } });
        return;
      }
      if (currentIndex.value >= problemList.value.length) {
        currentIndex.value = problemList.value.length - 1;
      }
    }

    // ✅ 추가: 마지막 문제 삭제 => 문제 삭제 + 세트 삭제
    else if (confirmType.value === "problemLast") {
      if (!currentQuestion.value) return;

      // 1) 마지막 문제 삭제
      await deleteUserProblem(currentQuestion.value.userProblemId);

      // 2) 세트 삭제
      await deleteUserProblemSet(problemSetId);

      // 3) 이동
      router.push({ name: "myPage" }); // 라우트명 맞춰서 변경
    }

    // ✅ 기존: 세트 삭제
    else {
      await deleteUserProblemSet(problemSetId);
      router.push({ name: "myPage" }); // 라우트명 맞춰서 변경
    }
  } finally {
    closeConfirm();
  }
};

// --- mapper ---
function toForm(q: UserProblem): UserProblemForm {
  return {
    problemDescription: q.problemDescription ?? "",
    choice1: q.choice1 ?? "",
    choice2: q.choice2 ?? "",
    choice3: q.choice3 ?? "",
    choice4: q.choice4 ?? "",
    answerChoice: String(q.answerChoice ?? 1),
  };
}

function toApi(f: UserProblemForm) {
  return {
    problemDescription: f.problemDescription,
    choice1: f.choice1,
    choice2: f.choice2,
    choice3: f.choice3,
    choice4: f.choice4,
    answerChoice: Number(f.answerChoice),
  };
}
</script>

<template>
  <div class="flex flex-col justify-center items-center px-4 py-4 gap-5 w-full">
    <p v-if="isLoading" class="Body2 text-gray-500">문제를 불러오는 중...</p>

    <p v-else-if="error" class="Body2 text-red-500">
      오류가 발생했습니다: {{ error.message }}
    </p>

    <template v-else>
      <!-- ✅ 우상단 액션 (내 세트에서만) -->
      <div
        v-if="currentQuestion && isOwn"
        class="w-full max-w-2xl flex justify-end gap-2"
      >
        <!-- 세트 삭제(전체) -->

        <Button
          variant="default"
          size="sm"
          type="button"
          @click="startEdit"
          :disabled="isEditing"
        >
          수정
        </Button>
        <Button
          variant="outline"
          size="sm"
          type="button"
          class="text-red-500"
          @click="openConfirm('problemSet')"
          :disabled="isEditing"
        >
          세트 삭제
        </Button>

        <!-- 문제 삭제(현재 문제만) -->
        <Button
          variant="outline"
          size="sm"
          type="button"
          class="text-red-500"
          @click="openConfirm('problem')"
          :disabled="isEditing"
        >
          문제 삭제
        </Button>
      </div>

      <!-- ✅ 수정 모드면 폼, 아니면 문제 카드 -->
      <UserProblemEditForm
        v-if="currentQuestion && isEditing"
        v-model="editForm"
        @save="saveEdit"
        @cancel="cancelEdit"
      />

      <UserProblemCard
        v-else-if="currentQuestion"
        :key="currentQuestion.userProblemId ?? currentIndex"
        :question="currentQuestion"
        @answered="handleAnswered"
      />

      <p v-if="lastResult && !isEditing" class="mt-4 Body2 text-center">
        {{ lastResult.correct ? "정답입니다 🎉" : "아쉽지만 오답입니다 😢" }}
      </p>

      <Button
        size="default"
        class="w-full"
        @click="goNext"
        :disabled="isEditing"
      >
        {{
          currentIndex < problemList.length - 1
            ? "다음 문제"
            : "문제 풀이 완료 🎉"
        }}
      </Button>
    </template>

    <!-- ✅ Confirm Modal -->
    <div
      v-if="confirmOpen"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div class="absolute inset-0 bg-black/40" @click="closeConfirm" />
      <div
        class="relative w-[min(92vw,420px)] rounded-xl bg-white p-5 shadow-lg"
      >
        <p class="Subtitle2 text-slate-900">{{ confirmTitle }}</p>
        <p class="Body2 mt-2 text-slate-600">{{ confirmDesc }}</p>

        <div class="mt-5 flex justify-end gap-2">
          <Button variant="outline" type="button" @click="closeConfirm">
            취소
          </Button>
          <Button variant="outline" type="button" @click="onConfirmDelete">
            삭제
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
