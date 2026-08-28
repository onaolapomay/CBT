import type { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";

interface KanbanColumnProps {
  title: string;
  count: number;
  id: string;
  children: ReactNode;
}

export function KanbanColumn({
  title,
  count,
  id,
  children,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <section
      ref={setNodeRef}
      className={[
        "min-h-[500px] rounded-2xl border p-4 transition-colors",
        isOver
          ? "border-indigo-300 bg-indigo-50"
          : "border-slate-200 bg-slate-50",
      ].join(" ")}
    >
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            {title}
          </h2>

          <p className="mt-0.5 text-xs text-slate-400">
            Questions
          </p>
        </div>

        <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-white px-2 text-xs font-semibold text-slate-600 shadow-sm">
          {count}
        </span>
      </header>

      <div className="flex min-h-[430px] flex-col gap-3">
        {children}
      </div>
    </section>
  );
}