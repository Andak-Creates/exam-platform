"use client";

import { useState } from "react";
import Link from "next/link";
import { BiTimer, BiFilter, BiWallet } from "react-icons/bi";
import { FaArrowRight, FaRegCheckCircle, FaTrophy } from "react-icons/fa";

// ✅ Define a proper type for an Exam
type Exam = {
  id: string;
  title: string;
  subject: string;
  prize: number;
  fee: number;
  status: "registered" | "not_registered" | "low_balance";
  startsAt: string;
  image: string;
};

const ExamsPage = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [showFilterOptions, setShowFilterOptions] = useState<boolean>(false);

  const subjects = ["All", "Mathematics", "English", "Physics", "Chemistry"];

  const exams: Exam[] = [
    {
      id: "math-sprint",
      title: "Mathematics Sprint",
      subject: "Mathematics",
      prize: 5000,
      fee: 50,
      status: "registered",
      startsAt: "10:00 AM",
      image: "/mathpic.png",
    },
    {
      id: "physics-championship",
      title: "Physics Championship",
      subject: "Physics",
      prize: 50000,
      fee: 50,
      status: "not_registered",
      startsAt: "Tomorrow 10:00 AM",
      image: "/chempic.png",
    },
    {
      id: "chemistry-pro",
      title: "Chemistry Pro",
      subject: "Chemistry",
      prize: 50000,
      fee: 50,
      status: "low_balance",
      startsAt: "Tomorrow 10:00 AM",
      image: "/chempic.png",
    },
  ];

  // ✅ Properly type the parameter here
  const getButtonConfig = (exam: Exam) => {
    if (exam.status === "registered")
      return { label: "Enter Exam", href: `/exams/${exam.id}/start` };
    if (exam.status === "low_balance")
      return { label: "Top Up Wallet", href: "/wallet" };
    return { label: "Register Now", href: `/exams/${exam.id}` };
  };

  // Filter exams based on selected subject
  const filteredExams =
    selectedSubject === "All"
      ? exams
      : exams.filter((exam) => exam.subject === selectedSubject);

  return (
    <div className="text-white mb-40">
      {/* Page Title */}
      <div>
        <h1 className="text-[40px] font-semibold">Exam Arena</h1>
        <p className="text-[#aaa]">
          Select an exam below to compete for cash prizes, use filters to narrow
          down your preferred subject or difficulty
        </p>

        {/* Filter */}
        <div className="flex flex-row gap-4 mt-8 items-center w-fit justify-self-end relative">
          <button
            onClick={() => setShowFilterOptions(!showFilterOptions)}
            className="py-2 px-4 text-white bg-[#ffffff10] border border-[#ffffff20] h-full rounded-3xl cursor-pointer flex flex-row items-center gap-2"
          >
            {selectedSubject}
            <BiFilter size={20} />
          </button>

          {/* Dropdown options */}
          {showFilterOptions && (
            <div className="absolute top-12 right-0 bg-[#00000098] backdrop-blur-lg border border-[#ffffff20] text-white rounded-3xl overflow-hidden z-50">
              {subjects.map((subj) => (
                <div
                  key={subj}
                  onClick={() => {
                    setSelectedSubject(subj);
                    setShowFilterOptions(false);
                  }}
                  className="px-4 py-2 hover:bg-[#ffffff10] cursor-pointer border-b border-[#ffffff20] last:border-none"
                >
                  {subj}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Exam Cards */}
      <div className="mt-5 flex flex-row flex-wrap gap-10">
        {filteredExams.map((exam) => {
          const button = getButtonConfig(exam);
          const isRegistered = exam.status === "registered";
          const isLowBalance = exam.status === "low_balance";

          return (
            <div
              key={exam.id}
              className={`rounded-3xl shadow-md overflow-hidden w-full md:w-70 cursor-pointer ${
                isRegistered
                  ? "border-4 border-dashed border-green-700 p-3"
                  : "border bg-[#8B1E1E]"
              }`}
            >
              {/* Image + overlay */}
              <div className="relative w-full h-37">
                <img
                  src={exam.image}
                  alt={exam.title}
                  className="object-cover w-full h-full rounded-t-3xl"
                />

                {/* Overlay tag */}
                <span
                  className={`absolute top-4 left-2 text-white text-xs font-semibold px-2 py-1 rounded-lg uppercase flex items-center gap-2 ${
                    isLowBalance ? "bg-[#8B1E1E]" : "bg-green-400"
                  }`}
                >
                  {isLowBalance ? <BiWallet /> : <FaRegCheckCircle />}
                  {isLowBalance ? "Low Balance" : "Available"}
                </span>

                {/* Bottom overlay info */}
                <div className="flex flex-col gap-1 absolute bottom-3 left-2 backdrop-blur-[2px] backdrop-brightness-90 p-3 rounded-md">
                  <h2 className="font-semibold text-lg">{exam.title}</h2>
                  <div className="flex text-[#aaa] text-sm gap-2">
                    <span className="flex items-center gap-2 text-white">
                      <BiTimer size={14} color="white" />
                      Starts at {exam.startsAt}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-4 flex flex-col gap-2 text-white bg-[#8B1E1E]">
                <div className="flex justify-between mt-2">
                  <div>
                    <p className="text-[#aaa] text-[12px] uppercase">
                      Prize Pool
                    </p>
                    <p className="font-bold">₦{exam.prize.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[#aaa] text-[12px] uppercase">
                      Entry Fee
                    </p>
                    <p className="font-bold">₦{exam.fee}</p>
                  </div>
                </div>

                <hr className="my-3 border-gray-300" />

                <div className="flex flex-row items-center gap-2 text-[#aaa]">
                  <FaTrophy color="yellow" />
                  <p className="text-[13px]">
                    {isRegistered
                      ? "Top 3 winners take all"
                      : "Top 10 winners share the pool"}
                  </p>
                </div>

                <Link href={button.href}>
                  <button className="mt-4 w-full py-2 bg-white text-[#8B1E1E] font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-[#ffffff10] hover:text-white hover:border hover:border-[#ffffff10] transition cursor-pointer">
                    {button.label} <FaArrowRight />
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExamsPage;
