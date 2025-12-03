import { createRouter, createWebHistory } from "vue-router";
import { PATH } from "@/shared/constants/paths";
import QuizRoomsPage from "@/pages/quizroom/QuizRoomsPage.vue";
import LoginPage from "@/pages/auth/LoginPage.vue";
import SignupPage from "@/pages/auth/SignupPage.vue";
import ProblemPage from "@/pages/problem/ProblemPage.vue";
import ProblemSetPage from "@/pages/problem/ProblemSetPage.vue";
import ProblemsetCommentPage from "@/pages/problem/ProblemsetCommentPage.vue";
import QuizRoomPage from "@/pages/quizroom/QuizRoomPage.vue";
import RankingPage from "@/pages/ranking/RankingPage.vue";
import IncorrectNotesPage from "@/pages/incorrectNote/IncorrectNotePage.vue";
import MyPage from "@/pages/myPage/MyPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import AppLayout from "@/shared/components/layout/AppLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: AppLayout,
      children: [
        {
          path: PATH.HOME,
          name: "home",
          component: QuizRoomsPage,
        },

        {
          path: PATH.PROBLEMS,
          name: "problems",
          component: ProblemPage,
        },
        {
          path: PATH.PROBLEM_SETS_ID,
          name: "problemSet",
          component: ProblemSetPage,
        },
        {
          path: PATH.PROBLEM_SETS_ID_COMMENTS,
          name: "problemSetComments",
          component: ProblemsetCommentPage,
        },
        {
          path: PATH.QUIZROOM,
          name: "quizroom",
          component: QuizRoomPage,
        },
        {
          path: PATH.RANKING,
          name: "ranking",
          component: RankingPage,
        },
        {
          path: PATH.INCORRECT_NOTES,
          name: "incorrectNotes",
          component: IncorrectNotesPage,
        },
        {
          path: PATH.MY_PAGE,
          name: "myPage",
          component: MyPage,
        },
        {
          path: "/:pathMatch(.*)*",
          name: "not-found",
          component: NotFoundPage,
        },
      ],
    },
    {
      path: PATH.LOGIN,
      name: "login",
      component: LoginPage,
    },
    {
      path: PATH.SIGNUP,
      name: "signup",
      component: SignupPage,
    },
  ],
});

export default router;
