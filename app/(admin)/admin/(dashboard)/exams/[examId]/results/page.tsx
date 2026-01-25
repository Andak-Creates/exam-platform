"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaDownload,
  FaRedo,
  FaBan,
  FaFilter,
  FaSearch,
} from "react-icons/fa";

// Mock exam data
const mockExam = {
  id: "1",
  title: "Mathematics Sprint 2025",
  totalQuestions: 50,
  passmark: 70,
  duration: 60,
};

// Mock results data
const mockResults = [
  {
    id: "1",
    userId: "user_001",
    userName: "John Doe",
    userEmail: "john@example.com",
    score: 84,
    totalPoints: 42,
    maxPoints: 50,
    passed: true,
    timeSpent: 55, // minutes
    completedAt: "2025-01-20 10:30 AM",
    answers: 50,
    correctAnswers: 42,
    status: "completed",
  },
  {
    id: "2",
    userId: "user_002",
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    score: 92,
    totalPoints: 46,
    maxPoints: 50,
    passed: true,
    timeSpent: 58,
    completedAt: "2025-01-20 11:15 AM",
    answers: 50,
    correctAnswers: 46,
    status: "completed",
  },
  {
    id: "3",
    userId: "user_003",
    userName: "Bob Johnson",
    userEmail: "bob@example.com",
    score: 56,
    totalPoints: 28,
    maxPoints: 50,
    passed: false,
    timeSpent: 60,
    completedAt: "2025-01-20 02:45 PM",
    answers: 50,
    correctAnswers: 28,
    status: "completed",
  },
  {
    id: "4",
    userId: "user_004",
    userName: "Alice Williams",
    userEmail: "alice@example.com",
    score: 78,
    totalPoints: 39,
    maxPoints: 50,
    passed: true,
    timeSpent: 52,
    completedAt: "2025-01-20 03:20 PM",
    answers: 50,
    correctAnswers: 39,
    status: "completed",
  },
  {
    id: "5",
    userId: "user_005",
    userName: "Charlie Brown",
    userEmail: "charlie@example.com",
    score: 44,
    totalPoints: 22,
    maxPoints: 50,
    passed: false,
    timeSpent: 45,
    completedAt: "2025-01-20 04:10 PM",
    answers: 50,
    correctAnswers: 22,
    status: "completed",
  },
  {
    id: "6",
    userId: "user_006",
    userName: "Diana Prince",
    userEmail: "diana@example.com",
    score: 0,
    totalPoints: 0,
    maxPoints: 50,
    passed: false,
    timeSpent: 0,
    completedAt: "2025-01-20 05:00 PM",
    answers: 0,
    correctAnswers: 0,
    status: "invalidated",
  },
];

export default function ExamResultsPage() {
  const params = useParams();
  const examId = params.examId as string;

  const [results, setResults] = useState(mockResults);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "passed" | "failed">(
    "all",
  );
  const [sortBy, setSortBy] = useState<"score" | "name" | "date">("score");

  // Calculate stats
  const totalAttempts = results.filter((r) => r.status === "completed").length;
  const passedCount = results.filter(
    (r) => r.passed && r.status === "completed",
  ).length;
  const failedCount = results.filter(
    (r) => !r.passed && r.status === "completed",
  ).length;
  const passRate =
    totalAttempts > 0 ? Math.round((passedCount / totalAttempts) * 100) : 0;
  const averageScore =
    totalAttempts > 0
      ? Math.round(
          results
            .filter((r) => r.status === "completed")
            .reduce((sum, r) => sum + r.score, 0) / totalAttempts,
        )
      : 0;
  const highestScore = Math.max(
    ...results.filter((r) => r.status === "completed").map((r) => r.score),
    0,
  );
  const lowestScore = Math.min(
    ...results.filter((r) => r.status === "completed").map((r) => r.score),
    100,
  );

  // Filter and sort results
  const filteredResults = results
    .filter((result) => {
      const matchesSearch =
        result.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "passed" && result.passed) ||
        (filterStatus === "failed" && !result.passed);
      return matchesSearch && matchesStatus && result.status === "completed";
    })
    .sort((a, b) => {
      if (sortBy === "score") return b.score - a.score;
      if (sortBy === "name") return a.userName.localeCompare(b.userName);
      if (sortBy === "date")
        return (
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
        );
      return 0;
    });

  // Handle actions
  const handleInvalidate = (resultId: string) => {
    if (
      confirm(
        "Are you sure you want to invalidate this attempt? This will mark it as void.",
      )
    ) {
      setResults(
        results.map((r) =>
          r.id === resultId ? { ...r, status: "invalidated", score: 0 } : r,
        ),
      );
      alert("Attempt invalidated");
    }
  };

  const handleReset = (userId: string) => {
    if (
      confirm(
        "Are you sure you want to reset this user's attempts? They will be able to retake the exam.",
      )
    ) {
      setResults(results.filter((r) => r.userId !== userId));
      alert("User attempts reset");
    }
  };

  const handleExportCSV = () => {
    // Simple CSV export
    const csvHeaders = [
      "Name",
      "Email",
      "Score",
      "Points",
      "Status",
      "Time Spent",
      "Completed At",
    ];
    const csvData = filteredResults.map((r) => [
      r.userName,
      r.userEmail,
      r.score,
      `${r.totalPoints}/${r.maxPoints}`,
      r.passed ? "Passed" : "Failed",
      `${r.timeSpent} min`,
      r.completedAt,
    ]);

    const csv = [
      csvHeaders.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `exam_${examId}_results.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Link
            href="/admin/exams"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-2"
          >
            <FaArrowLeft /> Back to Exam
          </Link>
          <h1 className="text-2xl font-bold text-white">{mockExam.title}</h1>
          <p className="text-gray-400 text-sm mt-1">Exam Results & Analytics</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition w-fit"
        >
          <FaDownload /> Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="redCard p-6">
          <p className="text-gray-400 text-sm">Total Attempts</p>
          <h3 className="text-white text-3xl font-bold mt-2">
            {totalAttempts}
          </h3>
        </div>

        <div className="redCard p-6">
          <p className="text-gray-400 text-sm">Pass Rate</p>
          <h3 className="text-white text-3xl font-bold mt-2">{passRate}%</h3>
          <p className="text-green-400 text-xs mt-1">
            {passedCount} passed • {failedCount} failed
          </p>
        </div>

        <div className="redCard p-6">
          <p className="text-gray-400 text-sm">Average Score</p>
          <h3 className="text-white text-3xl font-bold mt-2">
            {averageScore}%
          </h3>
        </div>

        <div className="redCard p-6">
          <p className="text-gray-400 text-sm">Score Range</p>
          <h3 className="text-white text-3xl font-bold mt-2">
            {lowestScore}-{highestScore}%
          </h3>
        </div>
      </div>

      {/* Filters */}
      <div className="redCard p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">
              <FaSearch className="inline mr-2" />
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full fadeInput rounded-lg px-3 py-2 text-white"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">
              <FaFilter className="inline mr-2" />
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full fadeInput rounded-lg px-3 py-2 text-white"
            >
              <option value="all">All Status</option>
              <option value="passed">Passed Only</option>
              <option value="failed">Failed Only</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full fadeInput rounded-lg px-3 py-2 text-white"
            >
              <option value="score">Score (High to Low)</option>
              <option value="name">Name (A-Z)</option>
              <option value="date">Date (Recent First)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results - Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {filteredResults.length === 0 ? (
          <div className="darkCard p-8 text-center">
            <p className="text-gray-400">No results found</p>
          </div>
        ) : (
          filteredResults.map((result) => (
            <div key={result.id} className="darkCard p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold">
                    {result.userName}
                  </h3>
                  <p className="text-gray-400 text-xs">{result.userEmail}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    result.passed
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {result.passed ? "Passed" : "Failed"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Score</p>
                  <p className="text-white font-bold text-lg">
                    {result.score}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Points</p>
                  <p className="text-white">
                    {result.totalPoints}/{result.maxPoints}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Time Spent</p>
                  <p className="text-white">{result.timeSpent} min</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Completed</p>
                  <p className="text-white text-xs">{result.completedAt}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-700">
                <button
                  onClick={() => handleInvalidate(result.id)}
                  className="flex-1 flex items-center justify-center gap-1 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded text-xs transition"
                >
                  <FaBan /> Invalidate
                </button>
                <button
                  onClick={() => handleReset(result.userId)}
                  className="flex-1 flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs transition"
                >
                  <FaRedo /> Reset
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Results - Desktop Table */}
      <div className="hidden lg:block darkCard overflow-hidden">
        {filteredResults.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-400">No results found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#8B2E2E]">
                <tr>
                  <th className="text-left text-gray-400 font-medium py-3 px-4">
                    Student
                  </th>
                  <th className="text-center text-gray-400 font-medium py-3 px-4">
                    Score
                  </th>
                  <th className="text-center text-gray-400 font-medium py-3 px-4">
                    Points
                  </th>
                  <th className="text-center text-gray-400 font-medium py-3 px-4">
                    Time
                  </th>
                  <th className="text-center text-gray-400 font-medium py-3 px-4">
                    Status
                  </th>
                  <th className="text-left text-gray-400 font-medium py-3 px-4">
                    Completed At
                  </th>
                  <th className="text-center text-gray-400 font-medium py-3 px-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((result) => (
                  <tr
                    key={result.id}
                    className="border-t border-[#8B2E2E] hover:bg-gray-800 transition"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-white font-medium">
                          {result.userName}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {result.userEmail}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`text-lg font-bold ${
                          result.score >= mockExam.passmark
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {result.score}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-white">
                      {result.totalPoints}/{result.maxPoints}
                    </td>
                    <td className="py-3 px-4 text-center text-white">
                      {result.timeSpent} min
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                          result.passed
                            ? "bg-green-600 text-white"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {result.passed ? (
                          <>
                            <FaCheckCircle /> Passed
                          </>
                        ) : (
                          <>
                            <FaTimesCircle /> Failed
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-300 text-sm">
                      {result.completedAt}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleInvalidate(result.id)}
                          className="p-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded transition"
                          title="Invalidate Attempt"
                        >
                          <FaBan />
                        </button>
                        <button
                          onClick={() => handleReset(result.userId)}
                          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                          title="Reset User Attempts"
                        >
                          <FaRedo />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
