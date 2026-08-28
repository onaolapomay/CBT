import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { mockQuestions } from "../data/mockQuestions";
import type { Question } from "../types/exam";

import { ExamHeader } from "../components/mock-exam/ExamHeader";
import { KanbanBoard } from "../components/mock-exam/KanbanBoard";

export const Route = createFileRoute("/")({
  component: MockExamPage,
});

function MockExamPage() {
  const [questions, setQuestions] =
    useState<Question[]>(mockQuestions);

    const [showSubmitConfirmation, setShowSubmitConfirmation] =
      useState(false);

  return (
    <main className="min-h-screen bg-slate-100">
      <ExamHeader
        totalQuestions={questions.length}
        answeredQuestions={
          questions.filter(
            (question) => question.selectedAnswer !== null,
          ).length
        }
        reviewQuestions={
          questions.filter(
            (question) => question.isMarkedForReview,
          ).length
        }
        onSubmit={() => setShowSubmitConfirmation(true)}
      />

      <div className="mx-auto max-w-[1600px] px-6 py-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Question Board
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Drag questions between groups to organize your exam.
          </p>
        </div>

        <KanbanBoard
          questions={questions}
          setQuestions={setQuestions}
        />
      </div>
    </main>
  );
}