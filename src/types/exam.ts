export type QuestionType =
  | "compulsory"
  | "follow-up"
  | "normal";

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  selectedAnswer: number | null;
  subject: string;
  topic: string;
  type: QuestionType;
  isMarkedForReview: boolean;
}