import { Check, ChevronLeft, ChevronRight, Flag, X } from "lucide-react";

import type { Question } from "../../types/exam";

interface QuestionPanelProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onClose: () => void;
  onAnswer: (answerIndex: number) => void;
  onMarkReview: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function QuestionPanel({
  question,
  questionNumber,
  totalQuestions,
  onClose,
  onAnswer,
  onMarkReview,
  onPrevious,
  onNext,
}: QuestionPanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Question {questionNumber} of {totalQuestions}
            </p>

            <h2 className="mt-1 text-lg font-bold text-slate-900">
              {question.subject}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close question"
          >
            <X size={20} />
          </button>
        </header>

        <div className="overflow-y-auto px-6 py-7">
          <div className="mb-6 flex items-center justify-between">
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
              {question.topic}
            </span>

            {question.isMarkedForReview && (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-600">
                <Flag size={14} />
                Marked for review
              </span>
            )}
          </div>

          <h3 className="text-xl font-semibold leading-8 text-slate-900">
            {question.question}
          </h3>

          <div className="mt-8 space-y-3">
            {question.options.map((option, index) => {
              const selected =
                question.selectedAnswer === index;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onAnswer(index)}
                  className={[
                    "flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all",
                    selected
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
                      selected
                        ? "border-indigo-500 bg-indigo-500 text-white"
                        : "border-slate-300 text-slate-500",
                    ].join(" ")}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span className="flex-1 text-sm font-medium text-slate-800">
                    {option}
                  </span>

                  {selected && (
                    <Check
                      size={18}
                      className="text-indigo-600"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={onPrevious}
            disabled={questionNumber === 1}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <button
            type="button"
            onClick={onMarkReview}
            className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
          >
            <Flag size={16} />
            {question.isMarkedForReview
              ? "Remove Review"
              : "Mark for Review"}
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={questionNumber === totalQuestions ||
              (question.type === "compulsory" &&
                question.selectedAnswer === null)}
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </footer>
      </div>
    </div>
  );
}