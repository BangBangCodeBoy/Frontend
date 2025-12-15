import type { AIProblem } from "@/shared/api/generated";
import type { UserProblemForm } from "@/features/problem-set/model/useProblemSetCreation";

export const normalizeAIProblems = (
  aiProblems: AIProblem[]
): UserProblemForm[] =>
  aiProblems
    .map((p) => {
      const answer = p.answer ?? 1;
      if (answer < 1 || answer > 4) return null;

      const form: UserProblemForm = {
        problemDescription: p.problemDescription?.trim() ?? "",
        choice1: p.choice1?.trim() ?? "",
        choice2: p.choice2?.trim() ?? "",
        choice3: p.choice3?.trim() ?? "",
        choice4: p.choice4?.trim() ?? "",
        answerChoice: String(answer),
      };

      if (
        !form.problemDescription ||
        !form.choice1 ||
        !form.choice2 ||
        !form.choice3 ||
        !form.choice4
      ) {
        return null;
      }
      return form;
    })
    .filter((v): v is UserProblemForm => !!v);
