import { UserProblemSetCategory as Category } from "@/shared/api/generated";

export const PROBLEM_SET_CATEGORY_OPTIONS = [
  { value: Category.INFOENGINEERING, label: "정보처리기사" },
  { value: Category.SQLD, label: "SQLD" },
] as const;
