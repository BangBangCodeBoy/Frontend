import { createRouter, createWebHistory } from "vue-router";
import { PATH } from "@/shared/constants/paths";
import LoginPage from "@/pages/auth/LoginPage.vue";
import SignupPage from "@/pages/auth/SignupPage.vue";
import ProblemPage from "@/pages/problem/ProblemPage.vue";
import ProblemSetSolvePage from "@/pages/problem/ProblemSetSolvePage.vue";
import ProblemsetCommentPage from "@/pages/problem/ProblemsetCommentPage.vue";
import QuizRoomPage from "@/pages/quiz-room/QuizRoomPage.vue";
import QuizRoomsPage from "@/pages/quiz-room/QuizRoomsPage.vue";
import RankingPage from "@/pages/ranking/RankingPage.vue";
import IncorrectNotesPage from "@/pages/incorrectNote/IncorrectNotePage.vue";
import MyPage from "@/pages/myPage/MyPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import AppLayout from "@/app/layout/AppLayout.vue";
import WaitingRoomPage from "@/pages/quiz-room-waiting/ui/WaitingRoomPage.vue";
import ProblemCreate from "@/pages/problem/ProblemCreate.vue";
import { useSessionStore } from "@/entities/session/model/sessionStore";
import AIProblemCreate from "@/pages/problem/AIProblemCreate.vue";

const rootGuard = (to, from, next) => {
  const session = useSessionStore();
  const isLoggedIn = session.isLoggedIn;

  if (isLoggedIn) {
    // 이미 home(또는 다른 내부 페이지)으로 가는 중이면 그냥 통과
    if (
      to.name === "home" ||
      to.name === "problems" ||
      to.name === "ranking" ||
      to.name === "incorrectNotes" ||
      to.name === "myPage" ||
      to.name === "problemSet" ||
      to.name === "problemSetComments" ||
      to.name === "problemCreate" ||
      to.name === "quizroom"
    ) {
      return next();
    }

    // root나 login에서 들어온 경우에만 home으로 보냄
    if (to.name === "root" || to.name === "login") {
      return next({ name: "home" });
    }

    return next();
  } else {
    // 로그인 안 되어 있는데 login으로 가는 중이면 통과
    if (to.name === "login" || to.name === "signup") {
      return next();
    }

    // 그 외에는 로그인 페이지로
    return next({ name: "login" });
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      beforeEnter: rootGuard,
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
          path: PATH.PROBLEM_CREATE,
          name: "problemCreate",
          component: ProblemCreate,
        },
        {
          path: PATH.AI_PROBLEM_CREATE,
          name: "AIProblemCreate",
          component: AIProblemCreate,
        },
        {
          path: PATH.PROBLEM_SETS_ID,
          name: "problemSet",
          component: ProblemSetSolvePage,
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
    {
      path: PATH.WAITING_ROOM,
      name: "waitingRoom",
      component: WaitingRoomPage,
    },
  ],
});

export default router;
