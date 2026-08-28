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

      const [isSubmitted, setIsSubmitted] = useState(false);

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

      {showSubmitConfirmation && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
      <h2 className="text-lg font-bold text-slate-900">
        Submit Exam?
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        Are yousure you want to submit your exam? You
        will not be able to change your answers afterwardss.
      </p>

      <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowSubmitConfirmation(false)}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => {
                setShowSubmitConfirmation(false);
                setIsSubmitted(true);
            }}
              className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )}
    </main>
  );
}