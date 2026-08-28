import { useEffect, useState } from "react";
import { Clock3, Flag, Send } from "lucide-react";

interface ExamHeaderProps {
  totalQuestions: number;
  answeredQuestions: number;
  reviewQuestions: number;
  onSubmit: () => void;
}

export function ExamHeader({
  totalQuestions,
  answeredQuestions,
  reviewQuestions,
  onSubmit,
}: ExamHeaderProps) {
  const [timeLeft, setTimeLeft] = useState(60 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((current) => current - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-6 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            CBT Mock Examination
          </p>

          <h1 className="mt-1 text-xl font-bold text-slate-900">
            Mathematics
          </h1>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-4">
          <div>
            <p className="text-xs text-slate-400">Questions</p>
            <p className="mt-0.5 text-sm font-semibold text-slate-800">
              {totalQuestions}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Answered</p>
            <p className="mt-0.5 text-sm font-semibold text-emerald-600">
              {answeredQuestions}
            </p>
          </div>

          <div>
            <p className="flex items-center gap-1 text-xs text-slate-400">
              <Flag size={12} />
              Review
            </p>

            <p className="mt-0.5 text-sm font-semibold text-amber-600">
              {reviewQuestions}
            </p>
          </div>

          <div className="h-8 w-px bg-slate-200" />

          <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2">
            <Clock3 size={16} className="text-slate-500" />

            <span className="font-mono text-sm font-semibold text-slate-800">
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </span>
          </div>

          <button
            type="button"
            onClick={onSubmit}
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Send size={15} />
            Submit Exam
          </button>
        </div>
      </div>
    </header>
  );
}