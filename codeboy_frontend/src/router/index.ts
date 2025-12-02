import { createRouter, createWebHistory } from "vue-router";
import { PATH } from "@/shared/constants/paths";
import QuizRoomsPage from "@/pages/quizroom/QuizRoomsPage.vue";
import LoginPage from "@/pages/auth/LoginPage.vue";
import SignupPage from "@/pages/auth/SignupPage.vue";
import ProblemsPage from "@/pages/problem/ProblemsPage.vue";
import ProblemSetPage from "@/pages/problem/ProblemSetPage.vue";
import ProblemSetCommentsPage from "@/pages/problem/ProblemSetCommentsPage.vue";
import QuizRoomPage from "@/pages/quizroom/QuizRoomPage.vue";
import RankingPage from "@/pages/ranking/RankingPage.vue";
import IncorrectNotesPage from "@/pages/incorrectNote/IncorrectNotePage.vue";
import MyPage from "@/pages/myPage/MyPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: PATH.HOME,
      name: "quizrooms",
      component: QuizRoomsPage,
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

    {
      path: PATH.PROBLEMS,
      name: "problems",
      component: ProblemsPage,
    },
    {
      path: PATH.PROBLEM_SETS_ID,
      name: "problemSet",
      component: ProblemSetPage,
    },
    {
      path: PATH.PROBLEM_SETS_ID_COMMENTS,
      name: "problemSetComments",
      component: ProblemSetCommentsPage,
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
});

export default router;
