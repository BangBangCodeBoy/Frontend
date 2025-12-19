// src/entities/question/model/question.types.ts
export interface ChoiceQuestion {
  id: number;
  description: string;
  choices: string[];
  answerIndex: number;
}
