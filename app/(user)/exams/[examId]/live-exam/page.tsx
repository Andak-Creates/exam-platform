"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const TOTAL_QUESTIONS = 20;
const EXAM_DURATION = 4 * 60; // 4 minutes

const mockQuestions = Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => ({
  id: i + 1,
  question: `This is question number ${i + 1}. What is the correct answer?`,
  correctAnswer: "A", // mock correct answer
  options: {
    A: "Option A",
    B: "Option B",
    C: "Option C",
    D: "Option D",
  },
}));

export default function TakeExamPage() {
  const router = useRouter();
  const { examId } = useParams();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);

  /* ---------------- FINISH EXAM ---------------- */
  const finishExam = () => {
    // Calculate score (mock logic)
    let score = 0;
    mockQuestions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score += 5; // 20 questions × 5 = 100
      }
    });

    // Mock rank & reward
    const rank = Math.floor(Math.random() * 100) + 1;
    const reward = score >= 70 ? 5000 : 0;

    const timeUsed = EXAM_DURATION - timeLeft;

    router.push(
      `/exams/${examId}/result?score=${score}&time=${timeUsed}&rank=${rank}&reward=${reward}`,
    );
  };

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (timeLeft <= 0) {
      finishExam();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  /* ---------------- PROGRESS ---------------- */
  const completedCount = Object.keys(answers).length;
  const progressPercent = Math.round((completedCount / TOTAL_QUESTIONS) * 100);

  const question = mockQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === TOTAL_QUESTIONS - 1;

  /* ---------------- HANDLERS ---------------- */
  const handleSelect = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: option,
    }));
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestion((q) => q + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((q) => q - 1);
    }
  };

  return (
    <div className="text-white max-w-3xl mx-auto px-4 pb-10">
      {/* TIMER */}
      <div className="flex justify-center mb-4">
        <div className="bg-[#8B1E1E] px-6 py-2 rounded-full font-semibold">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </div>
      </div>

      {/* PROGRESS */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-[#aaa] mb-2">
          <span>
            Question {currentQuestion + 1}/{TOTAL_QUESTIONS}
          </span>
          <span>{progressPercent}% completed</span>
        </div>

        <div className="w-full h-2 bg-[#ffffff20] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#8B1E1E]"
            style={{
              width: `${((currentQuestion + 1) / TOTAL_QUESTIONS) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* QUESTION */}
      <div className="bg-[#ffffff10] border border-[#ffffff20] rounded-2xl p-5">
        <h2 className="text-lg font-semibold mb-5">{question.question}</h2>

        <div className="flex flex-col gap-3">
          {Object.entries(question.options).map(([key, value]) => {
            const selected = answers[question.id] === key;

            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`flex items-center gap-3 border rounded-xl px-4 py-3 text-left
                  ${
                    selected
                      ? "bg-[#8B1E1E] border-[#8B1E1E]"
                      : "border-[#ffffff20] hover:bg-[#ffffff10]"
                  }`}
              >
                <span className="font-bold">{key}.</span>
                <span>{value}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`px-4 py-2 rounded-lg font-medium
            ${
              currentQuestion === 0
                ? "bg-gray-600 opacity-50 cursor-not-allowed"
                : "bg-[#ffffff20] hover:bg-[#ffffff30]"
            }`}
        >
          Previous
        </button>

        <button
          onClick={isLastQuestion ? finishExam : handleNext}
          className="px-6 py-2 rounded-lg bg-[#8B1E1E] font-semibold hover:bg-[#7a1a1a]"
        >
          {isLastQuestion ? "Complete Exam" : "Save & Next"}
        </button>
      </div>
    </div>
  );
}
