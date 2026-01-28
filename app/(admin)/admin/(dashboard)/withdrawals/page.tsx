"use client";

import OverViewCard from "@/components/ui/OverViewCard";
import { useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaDownload,
  FaRedo,
  FaBan,
  FaExclamationTriangle,
} from "react-icons/fa";

// Mock withdrawals data
const mockWithdrawals = [
  {
    id: "wth_001",
    userId: "user_001",
    userName: "John Doe",
    userEmail: "john@example.com",
    amount: 50.0,
    destinationAddress: "DGb1Fc8th5kL9mN2oP3qR4sT5uV6wX7yZ8aB9cD0eF1gH2iJ3",
    txid: "abc123def456ghi789jkl012mno345pqr678stu901vwx234yz",
    status: "sent",
    fee: 0.1,
    createdAt: "2025-01-21 12:00:00",
    sentAt: "2025-01-21 12:05:00",
    confirmations: 10,
  },
  {
    id: "wth_002",
    userId: "user_002",
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    amount: 200.0,
    destinationAddress: "DGb2Hd9ui6kL7mN8oP9qR0sT1uV2wX3yZ4aB5cD6eF7gH8iJ9",
    txid: null,
    status: "pending",
    fee: 0.2,
    createdAt: "2025-01-21 14:30:00",
    sentAt: null,
    confirmations: 0,
  },
  {
    id: "wth_003",
    userId: "user_003",
    userName: "Bob Johnson",
    userEmail: "bob@example.com",
    amount: 500.0,
    destinationAddress: "DGb3Jk8lm4nO5pQ6rS7tU8vW9xY0zA1bC2dE3fG4hI5jK6lM7",
    txid: "mno654lkj321ihg098fed765cba432zyx109wvu876tsr543qpo",
    status: "sent",
    fee: 0.5,
    createdAt: "2025-01-20 09:15:00",
    sentAt: "2025-01-20 09:20:00",
    confirmations: 25,
  },
  {
    id: "wth_004",
    userId: "user_004",
    userName: "Alice Williams",
    userEmail: "alice@example.com",
    amount: 100.0,
    destinationAddress: "DGb4Mn7op5qR6sT7uV8wX9yZ0aB1cD2eF3gH4iJ5kL6mN7oP8",
    txid: null,
    status: "failed",
    fee: 0.1,
    createdAt: "2025-01-21 11:00:00",
    sentAt: null,
    confirmations: 0,
    failureReason: "Insufficient network fee",
  },
  {
    id: "wth_005",
    userId: "user_005",
    userName: "Charlie Brown",
    userEmail: "charlie@example.com",
    amount: 75.0,
    destinationAddress: "DGb5Pq6rs7tU8vW9xY0zA1bC2dE3fG4hI5jK6lM7nO8pQ9rS0",
    txid: null,
    status: "queued",
    fee: 0.075,
    createdAt: "2025-01-21 15:45:00",
    sentAt: null,
    confirmations: 0,
  },
  {
    id: "wth_006",
    userId: "user_006",
    userName: "Diana Prince",
    userEmail: "diana@example.com",
    amount: 300.0,
    destinationAddress: "DGb6St7uV8wX9yZ0aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0uV1",
    txid: null,
    status: "blocked",
    fee: 0.3,
    createdAt: "2025-01-21 16:00:00",
    sentAt: null,
    confirmations: 0,
    blockReason: "Suspicious activity - under review",
  },
];

export default function WithdrawalsPage() {
  const [withdrawals, setWithdrawals] = useState(mockWithdrawals);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "queued" | "pending" | "sent" | "failed" | "blocked"
  >("all");
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<
    (typeof mockWithdrawals)[0] | null
  >(null);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [blockReason, setBlockReason] = useState("");

  // Calculate stats
  const totalWithdrawals = withdrawals.length;
  const queuedWithdrawals = withdrawals.filter(
    (w) => w.status === "queued",
  ).length;
  const pendingWithdrawals = withdrawals.filter(
    (w) => w.status === "pending",
  ).length;
  const totalAmount = withdrawals
    .filter((w) => w.status === "sent")
    .reduce((sum, w) => sum + w.amount, 0);

  // Filter withdrawals
  const filteredWithdrawals = withdrawals.filter((withdrawal) => {
    const matchesSearch =
      withdrawal.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.destinationAddress
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || withdrawal.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Handle approve (for queued withdrawals)
  const handleApprove = (withdrawal: (typeof mockWithdrawals)[0]) => {
    if (
      confirm(
        `Approve withdrawal of ${withdrawal.amount} DGB for ${withdrawal.userName}?`,
      )
    ) {
      setWithdrawals(
        withdrawals.map((w) =>
          w.id === withdrawal.id ? { ...w, status: "pending" } : w,
        ),
      );
      alert("Withdrawal approved and queued for processing");
    }
  };

  // Handle deny
  const handleDeny = (withdrawal: (typeof mockWithdrawals)[0]) => {
    if (
      confirm(
        `Deny withdrawal of ${withdrawal.amount} DGB for ${withdrawal.userName}?`,
      )
    ) {
      setWithdrawals(
        withdrawals.map((w) =>
          w.id === withdrawal.id
            ? {
                ...w,
                status: "failed",
                failureReason: "Denied by admin",
                txid: null,
                sentAt: null,
                blockReason: undefined,
              }
            : w,
        ),
      );
      alert("Withdrawal denied");
    }
  };

  // Handle retry failed
  const handleRetry = (withdrawal: (typeof mockWithdrawals)[0]) => {
    if (
      confirm(
        `Retry withdrawal of ${withdrawal.amount} DGB for ${withdrawal.userName}?`,
      )
    ) {
      setWithdrawals(
        withdrawals.map((w) =>
          w.id === withdrawal.id
            ? { ...w, status: "pending", failureReason: undefined }
            : w,
        ),
      );
      alert("Withdrawal retry initiated");
    }
  };

  // Handle block user
  const handleBlockUser = () => {
    if (!selectedWithdrawal || !blockReason.trim()) {
      alert("Please enter a reason for blocking");
      return;
    }

    setWithdrawals(
      withdrawals.map((w) =>
        w.userId === selectedWithdrawal.userId
          ? {
              ...w,
              status: "blocked",
              blockReason,
              txid: null,
              sentAt: null,
              failureReason: undefined,
            }
          : w,
      ),
    );

    alert(`User ${selectedWithdrawal.userName} blocked from withdrawals`);
    setShowBlockModal(false);
    setBlockReason("");
    setSelectedWithdrawal(null);
  };

  // Handle unblock user
  const handleUnblock = (withdrawal: (typeof mockWithdrawals)[0]) => {
    if (confirm(`Unblock ${withdrawal.userName} from making withdrawals?`)) {
      setWithdrawals(
        withdrawals.map((w) =>
          w.userId === withdrawal.userId
            ? { ...w, status: "queued", blockReason: undefined }
            : w,
        ),
      );
      alert("User unblocked");
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const csvHeaders = [
      "ID",
      "User",
      "Email",
      "Amount",
      "Destination",
      "Status",
      "Fee",
      "Created",
      "Sent",
    ];
    const csvData = filteredWithdrawals.map((w) => [
      w.id,
      w.userName,
      w.userEmail,
      w.amount,
      w.destinationAddress,
      w.status,
      w.fee,
      w.createdAt,
      w.sentAt || "N/A",
    ]);

    const csv = [
      csvHeaders.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `withdrawals_${new Date().toISOString()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Withdrawals</h1>
          <p className="text-gray-400 text-sm mt-1">
            Monitor and process user withdrawals
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition w-fit"
        >
          <FaDownload /> Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Withdrawals */}
        <OverViewCard title="Total Withdrawals" value={`${totalWithdrawals}`} />

        {/* Queued Withdrawals */}
        <OverViewCard
          title="Queued Withdrawals"
          value={`${queuedWithdrawals}`}
        />

        {/* Pending Withdrawals */}
        <OverViewCard
          title="Pending Withdrawals"
          value={`${pendingWithdrawals}`}
        />

        {/* Total sent */}
        <OverViewCard
          title="Total Sent"
          value={`${totalAmount.toFixed(2)} DGB`}
        />
      </div>

      {/* Filters */}
      <div className="darkCard p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">
              <FaSearch className="inline mr-2" />
              Search
            </label>
            <input
              type="text"
              placeholder="Search by user, email, or address..."
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
              <option value="queued">Queued</option>
              <option value="pending">Pending</option>
              <option value="sent">Sent</option>
              <option value="failed">Failed</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Withdrawals List - Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {filteredWithdrawals.length === 0 ? (
          <div className="redCard p-8 text-center">
            <p className="text-gray-400">No withdrawals found</p>
          </div>
        ) : (
          filteredWithdrawals.map((withdrawal) => (
            <div key={withdrawal.id} className="redCard p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold">
                    {withdrawal.userName}
                  </h3>
                  <p className="text-gray-400 text-xs">
                    {withdrawal.userEmail}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    withdrawal.status === "sent"
                      ? "bg-green-600 text-white"
                      : withdrawal.status === "pending"
                        ? "bg-blue-600 text-white"
                        : withdrawal.status === "queued"
                          ? "bg-yellow-600 text-white"
                          : withdrawal.status === "blocked"
                            ? "bg-purple-600 text-white"
                            : "bg-red-600 text-white"
                  }`}
                >
                  {withdrawal.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Amount</p>
                  <p className="text-white font-bold">
                    {withdrawal.amount} DGB
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Fee</p>
                  <p className="text-white">{withdrawal.fee} DGB</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400 text-xs">Destination</p>
                  <p className="text-white text-xs font-mono truncate">
                    {withdrawal.destinationAddress}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400 text-xs">Created</p>
                  <p className="text-white text-xs">{withdrawal.createdAt}</p>
                </div>
              </div>

              {withdrawal.failureReason && (
                <div className="bg-red-900 border border-red-600 rounded p-2 mb-3">
                  <p className="text-red-400 text-xs">
                    <FaExclamationTriangle className="inline mr-1" />
                    {withdrawal.failureReason}
                  </p>
                </div>
              )}

              {withdrawal.blockReason && (
                <div className="bg-purple-900 border border-purple-600 rounded p-2 mb-3">
                  <p className="text-purple-400 text-xs">
                    <FaBan className="inline mr-1" />
                    {withdrawal.blockReason}
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-3 border-t border-gray-700">
                <button
                  onClick={() => setSelectedWithdrawal(withdrawal)}
                  className="flex-1 flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs transition"
                >
                  <FaEye /> Details
                </button>

                {withdrawal.status === "queued" && (
                  <>
                    <button
                      onClick={() => handleApprove(withdrawal)}
                      className="flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-xs transition"
                    >
                      <FaCheckCircle /> Approve
                    </button>
                    <button
                      onClick={() => handleDeny(withdrawal)}
                      className="flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-xs transition"
                    >
                      <FaTimesCircle /> Deny
                    </button>
                  </>
                )}

                {withdrawal.status === "failed" && (
                  <button
                    onClick={() => handleRetry(withdrawal)}
                    className="flex items-center justify-center gap-1 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded text-xs transition"
                  >
                    <FaRedo /> Retry
                  </button>
                )}

                {withdrawal.status === "blocked" && (
                  <button
                    onClick={() => handleUnblock(withdrawal)}
                    className="flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-xs transition"
                  >
                    <FaCheckCircle /> Unblock
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Withdrawals List - Desktop Table */}
      <div className="hidden lg:block redCard overflow-hidden">
        {filteredWithdrawals.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-400">No withdrawals found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="darkCard">
                <tr>
                  <th className="text-left text-gray-400 font-medium py-3 px-4">
                    User
                  </th>
                  <th className="text-right text-gray-400 font-medium py-3 px-4">
                    Amount
                  </th>
                  <th className="text-left text-gray-400 font-medium py-3 px-4">
                    Destination
                  </th>
                  <th className="text-center text-gray-400 font-medium py-3 px-4">
                    Status
                  </th>
                  <th className="text-left text-gray-400 font-medium py-3 px-4">
                    Created
                  </th>
                  <th className="text-center text-gray-400 font-medium py-3 px-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredWithdrawals.map((withdrawal) => (
                  <tr
                    key={withdrawal.id}
                    className="border-t border-gray-800 hover:bg-gray-800 transition"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-white font-medium">
                          {withdrawal.userName}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {withdrawal.userEmail}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-white font-mono font-semibold">
                        {withdrawal.amount} DGB
                      </span>
                      <p className="text-gray-400 text-xs">
                        Fee: {withdrawal.fee} DGB
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-300 font-mono text-xs">
                        {withdrawal.destinationAddress.substring(0, 25)}...
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                          withdrawal.status === "sent"
                            ? "bg-green-600 text-white"
                            : withdrawal.status === "pending"
                              ? "bg-blue-600 text-white"
                              : withdrawal.status === "queued"
                                ? "bg-yellow-600 text-white"
                                : withdrawal.status === "blocked"
                                  ? "bg-purple-600 text-white"
                                  : "bg-red-600 text-white"
                        }`}
                      >
                        {withdrawal.status === "sent" && <FaCheckCircle />}
                        {withdrawal.status === "pending" && <FaClock />}
                        {withdrawal.status === "queued" && <FaClock />}
                        {withdrawal.status === "failed" && <FaTimesCircle />}
                        {withdrawal.status === "blocked" && <FaBan />}
                        {withdrawal.status}
                      </span>
                      {withdrawal.failureReason && (
                        <p className="text-red-400 text-xs mt-1">
                          {withdrawal.failureReason}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-300 text-sm">
                      {withdrawal.createdAt}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedWithdrawal(withdrawal)}
                          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                          title="View Details"
                        >
                          <FaEye />
                        </button>

                        {withdrawal.status === "queued" && (
                          <>
                            <button
                              onClick={() => handleApprove(withdrawal)}
                              className="p-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
                              title="Approve"
                            >
                              <FaCheckCircle />
                            </button>
                            <button
                              onClick={() => handleDeny(withdrawal)}
                              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
                              title="Deny"
                            >
                              <FaTimesCircle />
                            </button>
                          </>
                        )}

                        {withdrawal.status === "failed" && (
                          <button
                            onClick={() => handleRetry(withdrawal)}
                            className="p-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded transition"
                            title="Retry"
                          >
                            <FaRedo />
                          </button>
                        )}

                        {withdrawal.status !== "blocked" && (
                          <button
                            onClick={() => {
                              setSelectedWithdrawal(withdrawal);
                              setShowBlockModal(true);
                            }}
                            className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition"
                            title="Block User"
                          >
                            <FaBan />
                          </button>
                        )}

                        {withdrawal.status === "blocked" && (
                          <button
                            onClick={() => handleUnblock(withdrawal)}
                            className="p-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
                            title="Unblock User"
                          >
                            <FaCheckCircle />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Withdrawal Details Modal */}
      {selectedWithdrawal && !showBlockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="darkCard p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-xl font-bold">
                Withdrawal Details
              </h2>
              <button
                onClick={() => setSelectedWithdrawal(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">User</p>
                  <p className="text-white font-medium">
                    {selectedWithdrawal.userName}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {selectedWithdrawal.userEmail}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs mt-1 ${
                      selectedWithdrawal.status === "sent"
                        ? "bg-green-600 text-white"
                        : selectedWithdrawal.status === "pending"
                          ? "bg-blue-600 text-white"
                          : selectedWithdrawal.status === "queued"
                            ? "bg-yellow-600 text-white"
                            : selectedWithdrawal.status === "blocked"
                              ? "bg-purple-600 text-white"
                              : "bg-red-600 text-white"
                    }`}
                  >
                    {selectedWithdrawal.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Amount</p>
                  <p className="text-white font-bold text-xl">
                    {selectedWithdrawal.amount} DGB
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Network Fee</p>
                  <p className="text-gray-300 font-semibold text-xl">
                    {selectedWithdrawal.fee} DGB
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-1">
                  Destination Address
                </p>
                <p className="text-white font-mono text-sm break-all bg-gray-800 p-2 rounded">
                  {selectedWithdrawal.destinationAddress}
                </p>
              </div>

              {selectedWithdrawal.txid && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Transaction ID</p>
                  <p className="text-white font-mono text-sm break-all bg-gray-800 p-2 rounded">
                    {selectedWithdrawal.txid}
                  </p>
                </div>
              )}
              {selectedWithdrawal.confirmations > 0 && (
                <div>
                  <p className="text-gray-400 text-sm">Confirmations</p>
                  <p className="text-green-400 font-semibold">
                    {selectedWithdrawal.confirmations}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Created At</p>
                  <p className="text-white">{selectedWithdrawal.createdAt}</p>
                </div>
                {selectedWithdrawal.sentAt && (
                  <div>
                    <p className="text-gray-400 text-sm">Sent At</p>
                    <p className="text-white">{selectedWithdrawal.sentAt}</p>
                  </div>
                )}
              </div>

              {selectedWithdrawal.failureReason && (
                <div className="bg-red-900 border border-red-600 rounded-lg p-3">
                  <p className="text-red-400 text-sm">
                    <FaExclamationTriangle className="inline mr-2" />
                    {selectedWithdrawal.failureReason}
                  </p>
                </div>
              )}

              {selectedWithdrawal.blockReason && (
                <div className="bg-purple-900 border border-purple-600 rounded-lg p-3">
                  <p className="text-purple-400 text-sm">
                    <FaBan className="inline mr-2" />
                    {selectedWithdrawal.blockReason}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setSelectedWithdrawal(null)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
              >
                Close
              </button>
              {selectedWithdrawal.status === "failed" && (
                <button
                  onClick={() => {
                    handleRetry(selectedWithdrawal);
                    setSelectedWithdrawal(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <FaRedo /> Retry Withdrawal
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Block User Modal */}
      {showBlockModal && selectedWithdrawal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="redCard p-6 max-w-md w-full">
            <h2 className="text-white text-xl font-bold mb-4">
              Block User from Withdrawals
            </h2>

            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">User</p>
              <p className="text-white font-medium">
                {selectedWithdrawal.userName}
              </p>
              <p className="text-gray-400 text-xs">
                {selectedWithdrawal.userEmail}
              </p>
            </div>

            <div className="mb-4">
              <label className="text-gray-400 text-sm mb-2 block">
                Reason for Blocking *
              </label>
              <textarea
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="Enter reason (e.g., Suspicious activity, fraud investigation)..."
                rows={3}
                className="w-full fadeInput rounded-lg px-4 py-2 text-white"
              />
            </div>

            <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-3 mb-4">
              <p className="text-yellow-400 text-sm">
                ⚠️ This will prevent the user from making any withdrawals until
                unblocked.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowBlockModal(false);
                  setBlockReason("");
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleBlockUser}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                Block User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
