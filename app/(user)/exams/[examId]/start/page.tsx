"use client";

import Link from "next/link";
import { CiTimer } from "react-icons/ci";
import { MdLockOutline } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

const StartPage = ({ params }: { params: { examId: string } }) => {
  return (
    <div className="min-h-screen flex justify-center bg-black text-white px-0">
      <div className="w-full max-w-xl bg-[#ffffff10] border border-[#ffffff20] rounded-3xl shadow-xl p-6 md:p-8 text-center">
        {/* Icon */}
        <div className="w-14 h-14 mx-auto rounded-full bg-[#8B1E1E20] flex items-center justify-center mb-4">
          <CiTimer size={28} className="text-[#8B1E1E]" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold">Ready to Start Your Exam?</h1>

        {/* Subtitle */}
        <p className="text-[#aaa] mt-2">
          You are about to begin{" "}
          <span className="text-white font-semibold capitalize">
            {params.examId.replace(/-/g, " ")}
          </span>
        </p>

        {/* Warning Box */}
        <div className="mt-5 bg-[#8B1E1E15] border border-[#8B1E1E40] rounded-2xl p-4 text-left">
          <p className="font-semibold mb-2 flex items-center gap-2">
            <MdLockOutline />
            Important Instructions
          </p>
          <ul className="text-sm text-[#aaa] list-disc list-inside space-y-1">
            <li>The exam is timed and starts immediately</li>
            <li>Do not refresh or leave this page</li>
            <li>Leaving the exam will result in disqualification</li>
            <li>Your answers are auto-saved</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href={`/exams/${params.examId}/live-exam`}
            className="w-full flex items-center justify-center gap-2 bg-[#8B1E1E] hover:bg-[#7a1a1a] transition px-6 py-3 rounded-xl font-semibold"
          >
            Start Exam <FaArrowRight />
          </Link>

          <Link
            href={`/exams/${params.examId}`}
            className="w-full text-center py-3 rounded-xl border border-[#ffffff30] text-[#aaa] hover:text-white hover:border-white transition"
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
