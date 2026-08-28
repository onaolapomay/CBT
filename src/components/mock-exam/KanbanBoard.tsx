import { useState } from "react";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy, } from "@dnd-kit/sortable";
import type { Dispatch, SetStateAction } from "react";
import type { Question, QuestionType } from "../../types/exam";
import { KanbanColumn } from "./KanbanColumn";
import { QuestionCard } from "./QuestionCard";
import { QuestionCardOverlay } from "./QuestionCardOverlay";
import { QuestionPanel } from "./QuestionPanel";

interface KanbanBoardProps {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
}

export function KanbanBoard({
  questions,
  setQuestions,
}: KanbanBoardProps) {
  const [activeQuestion, setActiveQuestion] =
    useState<Question | null>(null);

  const [selectedQuestionId, setSelectedQuestionId] =
    useState<number | null>(null);

  const selectedQuestion = questions.find(
    (question) => question.id === selectedQuestionId,
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    const question = questions.find(
      (item) => item.id === Number(event.active.id),
    );

    setActiveQuestion(question ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveQuestion(null);

    if (!over) return;

    const activeId = Number(active.id);
    const overId = Number(over.id);

    setQuestions((currentQuestions) => {
      const activeQuestion = currentQuestions.find(
        (question) => question.id === activeId,
      );

      if (!activeQuestion) return currentQuestions;

      const overQuestion = currentQuestions.find(
        (question) => question.id === overId,
      );

      if (!overQuestion) {
        const type = String(over.id) as QuestionType;

        if (
          type !== "compulsory" &&
          type !== "follow-up" &&
          type !== "normal"
        ) {
          return currentQuestions;
        }

        return currentQuestions.map((question) =>
          question.id === activeId
            ? {
                ...question,
                type,
              }
            : question,
        );
      }

      if (activeQuestion.type === overQuestion.type) {
        const columnQuestions = currentQuestions.filter(
          (question) =>
            question.type === activeQuestion.type,
        );

        const oldIndex = columnQuestions.findIndex(
          (question) => question.id === activeId,
        );

        const newIndex = columnQuestions.findIndex(
          (question) => question.id === overId,
        );

        const reordered = arrayMove(
          columnQuestions,
          oldIndex,
          newIndex,
        );

        const otherQuestions = currentQuestions.filter(
          (question) =>
            question.type !== activeQuestion.type,
        );

        return [...otherQuestions, ...reordered];
      }

      return currentQuestions.map((question) =>
        question.id === activeId
          ? {
              ...question,
              type: overQuestion.type,
            }
          : question,
      );
    });
  }

  const compulsory = questions.filter(
    (question) => question.type === "compulsory",
  );

  const followUp = questions.filter(
    (question) => question.type === "follow-up",
  );

  const normal = questions.filter(
    (question) => question.type === "normal",
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <KanbanColumn
          title="Compulsory"
          count={compulsory.length}
          id="compulsory"
        >
          <SortableContext
            items={compulsory.map((question) => question.id)}
            strategy={verticalListSortingStrategy}
          >
            {compulsory.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onClick={() =>
                  setSelectedQuestionId(question.id)
                }
              />
            ))}
          </SortableContext>
        </KanbanColumn>

        <KanbanColumn
          title="Follow-up / Group"
          count={followUp.length}
          id="follow-up"
        >
          <SortableContext
            items={followUp.map((question) => question.id)}
            strategy={verticalListSortingStrategy}
          >
            {followUp.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onClick={() =>
                  setSelectedQuestionId(question.id)
                }
              />
            ))}
          </SortableContext>
        </KanbanColumn>

        <KanbanColumn
          title="Normal"
          count={normal.length}
          id="normal"
        >
          <SortableContext
            items={normal.map((question) => question.id)}
            strategy={verticalListSortingStrategy}
          >
            {normal.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onClick={() =>
                  setSelectedQuestionId(question.id)
                }
              />
            ))}
          </SortableContext>
        </KanbanColumn>
      </div>

      <DragOverlay>
        {activeQuestion ? (
          <QuestionCardOverlay question={activeQuestion} />
        ) : null}
      </DragOverlay>

      {selectedQuestion && (
        <QuestionPanel
          question={selectedQuestion}
          questionNumber={
            questions.findIndex(
              (question) =>
                question.id === selectedQuestion.id,
            ) + 1
          }
          totalQuestions={questions.length}
          onClose={() => setSelectedQuestionId(null)}
          onAnswer={(answerIndex) => {
            setQuestions((currentQuestions) =>
              currentQuestions.map((question) =>
                question.id === selectedQuestion.id
                  ? {
                      ...question,
                      selectedAnswer: answerIndex,
                    }
                  : question,
              ),
            );
          }}
          onMarkReview={() => {
              setQuestions((currentQuestions) =>
                currentQuestions.map((question) =>
                  question.id === selectedQuestion.id
                    ? {
                        ...question,
                        isMarkedForReview: !question.isMarkedForReview,
                      }
                    : question,
                ),
              );
            }}
          onPrevious={() => {
            const currentIndex = questions.findIndex(
              (question) =>
                question.id === selectedQuestion.id,
            );

            if (currentIndex > 0) {
              setSelectedQuestionId(
                questions[currentIndex - 1].id,
              );
            }
          }}
          onNext={() => {
            const currentIndex = questions.findIndex(
              (question) =>
                question.id === selectedQuestion.id,
            );

            if (currentIndex < questions.length - 1) {
              setSelectedQuestionId(
                questions[currentIndex + 1].id,
              );
            }
          }}
        />
      )}
    </DndContext>
  );
}