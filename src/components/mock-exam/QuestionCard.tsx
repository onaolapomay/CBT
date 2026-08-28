import { CheckCircle2, GripVertical, Star } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { Question } from "../../types/exam";

interface QuestionCardProps {
  question: Question;
  onClick: () => void;
}

export function QuestionCard({
  question,
  onClick,
}: QuestionCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: question.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      className={[
        "group cursor-pointer rounded-xl border bg-white p-4",
        "transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md",
        isDragging
          ? "z-50 scale-[1.02] opacity-60 shadow-xl"
          : "border-slate-200 shadow-sm",
      ].join(" ")}
    >
      {/* Top */}
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

        <button
          type="button"
          {...attributes}
          {...listeners}
          onClick={(event) => event.stopPropagation()}
          className="rounded-md p-1 text-slate-300 opacity-0 transition group-hover:opacity-100 hover:bg-slate-100 hover:text-slate-600"
          aria-label={`Drag question ${question.id}`}
        >
          <GripVertical size={17} />
        </button>
      </div>

      {/* Question */}
      <p className="mt-4 text-sm font-medium leading-6 text-slate-800">
        {question.question}
      </p>

      {/* Bottom */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500">
          {question.topic}
        </span>

        {question.status === "answered" && (
          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
            <CheckCircle2 size={14} />
            Answered
          </span>
        )}

        {question.status === "review" && (
          <span className="flex items-center gap-1.5 text-xs font-medium text-amber-600">
            <Star size={14} />
            Review
          </span>
        )}

        {question.status === "unanswered" && (
          <span className="text-xs font-medium text-slate-400">
            Unanswered
          </span>
        )}
      </div>
    </article>
  );
}