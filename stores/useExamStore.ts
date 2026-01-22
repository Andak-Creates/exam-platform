import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Exam {
  id: string;
  title: string;
  subject: string;
  prize: number;
  fee: number;
  status: "registered" | "not_registered" | "low_balance";
  startsAt: string;
  image: string;
}

interface ExamStore {
  exams: Exam[];
  setExams: (exams: Exam[]) => void;
  getExamById: (id: string) => Exam | undefined;
}

export const useExamStore = create<ExamStore>()(
  persist(
    (set, get) => ({
      exams: [],
      setExams: (exams) => set({ exams }),
      getExamById: (id) => get().exams.find((e) => e.id === id),
    }),
    {
      name: "exam-storage", // key in localStorage
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
