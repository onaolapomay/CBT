import { CheckCircle2, GripVertical, Star } from "lucide-react";

import type { Question } from "../../types/exam";

interface QuestionCardOverlayProps {
  question: Question;
}

export function QuestionCardOverlay({
  question,
}: QuestionCardOverlayProps) {
  return (
    <article className="w-[320px] rotate-2 cursor-grabbing rounded-xl border border-slate-300 bg-white p-4 shadow-2xl">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
            {String(question.id).padStart(2, "0")}
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Question
            </p>

            <p className="text-xs font-medium text-slate-600">
              {question.subject}
            </p>
          </div>
        </div>

        <GripVertical
          size={17}
          className="text-slate-300"
        />
      </div>

      <p className="mt-4 text-sm font-medium leading-6 text-slate-800">
        {question.question}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500">
          {question.topic}
        </span>

        {question.isMarkedForReview ? (
          <span className="flex items-center gap-1.5 text-xs font-medium text-amber-600">
            <Star size={14} />
            Review
          </span>
        ) : question.selectedAnswer !== null ? (
          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
            <CheckCircle2 size={14} />
            Answered
          </span>
        ) : (
          <span className="text-xs font-medium text-slate-400">
            Unanswered
          </span>
        )}
      </div>
    </article>
  );
}