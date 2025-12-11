// src/features/problem-set/model/filterCategory.ts
import { UserProblemSetCategory as Category } from "@/shared/api/generated";

export type FilterCategory = Category | "ALL";

export const categoryList: FilterCategory[] = [
  "ALL",
  Category.INFOENGINEERING,
  Category.SQLD,
];

export const categoryLabelMap: Record<FilterCategory, string> = {
  ALL: "전체",
  [Category.INFOENGINEERING]: "정보처리기사",
  [Category.SQLD]: "SQLD",
};
