"use client";

import OverViewCard from "@/components/ui/OverViewCard";
import { useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaCheckCircle,
  FaExclamationCircle,
  FaClock,
  FaDownload,
  FaPlus,
  FaUndo,
} from "react-icons/fa";

// Mock deposits data
const mockDeposits = [
  {
    id: "dep_001",
    userId: "user_001",
    userName: "John Doe",
    userEmail: "john@example.com",
    amount: 100.5,
    txid: "abc123def456ghi789jkl012mno345pqr678stu901vwx234yz",
    status: "confirmed",
    confirmations: 6,
    depositAddress: "DGb1Fc8th5...xYz9Abc",
    creditedAmount: 100.5,
    createdAt: "2025-01-20 10:30:00",
    confirmedAt: "2025-01-20 10:45:00",
  },
  {
    id: "dep_002",
    userId: "user_002",
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    amount: 250.0,
    txid: "xyz987wvu654tsr321qpo098nml765kji432hgf109edc876ba",
    status: "pending",
    confirmations: 2,
    depositAddress: "DGb2Hd9ui6...aB1cDe2",
    creditedAmount: 0,
    createdAt: "2025-01-21 09:15:00",
    confirmedAt: null,
  },
  {
    id: "dep_003",
    userId: "user_003",
    userName: "Bob Johnson",
    userEmail: "bob@example.com",
    amount: 500.0,
    txid: "mno654lkj321ihg098fed765cba432zyx109wvu876tsr543qpo",
    status: "confirmed",
    confirmations: 12,
    depositAddress: "DGb3Jk8lm4...eF3gHi4",
    creditedAmount: 500.0,
    createdAt: "2025-01-19 14:20:00",
    confirmedAt: "2025-01-19 15:00:00",
  },
  {
    id: "dep_004",
    userId: "user_004",
    userName: "Alice Williams",
    userEmail: "alice@example.com",
    amount: 75.25,
    txid: "pqr321onm098lkj765ihg432fed109cba876zyx543wvu210tsr",
    status: "failed",
    confirmations: 0,
    depositAddress: "DGb4Mn7op5...iJ5kLm6",
    creditedAmount: 0,
    createdAt: "2025-01-21 11:00:00",
    confirmedAt: null,
  },
  {
    id: "dep_005",
    userId: "user_005",
    userName: "Charlie Brown",
    userEmail: "charlie@example.com",
    amount: 1000.0,
    txid: "stu098rqp765onm432lkj109ihg876fed543cba210zyx987wvu",
    status: "confirmed",
    confirmations: 20,
    depositAddress: "DGb5Pq6rs7...mN7oP8q",
    creditedAmount: 1000.0,
    createdAt: "2025-01-18 08:30:00",
    confirmedAt: "2025-01-18 09:15:00",
  },
];

export default function DepositsPage() {
  const [deposits] = useState(mockDeposits);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "confirmed" | "pending" | "failed"
  >("all");
  const [selectedDeposit, setSelectedDeposit] = useState<
    (typeof mockDeposits)[0] | null
  >(null);
  const [showManualCreditModal, setShowManualCreditModal] = useState(false);
  const [manualCreditAmount, setManualCreditAmount] = useState("");

  // Calculate stats
  const totalDeposits = deposits.length;
  const confirmedDeposits = deposits.filter(
    (d) => d.status === "confirmed",
  ).length;
  const pendingDeposits = deposits.filter((d) => d.status === "pending").length;
  const totalAmount = deposits
    .filter((d) => d.status === "confirmed")
    .reduce((sum, d) => sum + d.amount, 0);

  // Filter deposits
  const filteredDeposits = deposits.filter((deposit) => {
    const matchesSearch =
      deposit.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deposit.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deposit.txid.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || deposit.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Handle manual credit
  const handleManualCredit = () => {
    if (!selectedDeposit || !manualCreditAmount) {
      alert("Please enter an amount");
      return;
    }

    console.log("Manual credit:", {
      depositId: selectedDeposit.id,
      userId: selectedDeposit.userId,
      amount: parseFloat(manualCreditAmount),
    });

    alert(
      `Manually credited ${manualCreditAmount} DGB to ${selectedDeposit.userName}`,
    );
    setShowManualCreditModal(false);
    setManualCreditAmount("");
    setSelectedDeposit(null);
  };

  // Handle reverse credit
  const handleReverseCredit = (deposit: (typeof mockDeposits)[0]) => {
    if (
      confirm(
        `Are you sure you want to reverse the credit of ${deposit.creditedAmount} DGB for ${deposit.userName}?`,
      )
    ) {
      console.log("Reverse credit:", deposit.id);
      alert("Credit reversed (mock)");
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const csvHeaders = [
      "ID",
      "User",
      "Email",
      "Amount",
      "Status",
      "Confirmations",
      "Date",
    ];
    const csvData = filteredDeposits.map((d) => [
      d.id,
      d.userName,
      d.userEmail,
      d.amount,
      d.status,
      d.confirmations,
      d.createdAt,
    ]);

    const csv = [
      csvHeaders.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `deposits_${new Date().toISOString()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Deposits</h1>
          <p className="text-gray-400 text-sm mt-1">
            Monitor and manage all user deposits
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
        {/* Total Deposits */}
        <OverViewCard title="Total Deposits" value={`${totalDeposits}`} />

        {/* Confirmed Deposits */}
        <OverViewCard
          title="Confirmed Deposits"
          value={`${confirmedDeposits}`}
        />

        {/* Pending Depopsits */}
        <OverViewCard title="Pending Deposits" value={`${pendingDeposits}`} />

        {/* Total Amount */}
        <OverViewCard
          title="Total Amount"
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
              placeholder="Search by user, email, or txid..."
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
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Deposits List - Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {filteredDeposits.length === 0 ? (
          <div className="redCard p-8 text-center">
            <p className="text-gray-400">No deposits found</p>
          </div>
        ) : (
          filteredDeposits.map((deposit) => (
            <div key={deposit.id} className="redCard p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold">
                    {deposit.userName}
                  </h3>
                  <p className="text-gray-400 text-xs">{deposit.userEmail}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    deposit.status === "confirmed"
                      ? "bg-green-600 text-white"
                      : deposit.status === "pending"
                        ? "bg-yellow-600 text-white"
                        : "bg-red-600 text-white"
                  }`}
                >
                  {deposit.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Amount</p>
                  <p className="text-white font-bold">{deposit.amount} DGB</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Confirmations</p>
                  <p className="text-white">{deposit.confirmations}/6</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400 text-xs">Transaction ID</p>
                  <p className="text-white text-xs font-mono truncate">
                    {deposit.txid}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400 text-xs">Date</p>
                  <p className="text-white text-xs">{deposit.createdAt}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-700">
                <button
                  onClick={() => setSelectedDeposit(deposit)}
                  className="flex-1 flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs transition"
                >
                  <FaEye /> View Details
                </button>
                {deposit.status === "confirmed" && (
                  <button
                    onClick={() => handleReverseCredit(deposit)}
                    className="flex-1 flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-xs transition"
                  >
                    <FaUndo /> Reverse
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Deposits List - Desktop Table */}
      <div className="hidden lg:block redCard overflow-hidden">
        {filteredDeposits.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-400">No deposits found</p>
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
                    Transaction ID
                  </th>
                  <th className="text-center text-gray-400 font-medium py-3 px-4">
                    Confirmations
                  </th>
                  <th className="text-center text-gray-400 font-medium py-3 px-4">
                    Status
                  </th>
                  <th className="text-left text-gray-400 font-medium py-3 px-4">
                    Date
                  </th>
                  <th className="text-center text-gray-400 font-medium py-3 px-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDeposits.map((deposit) => (
                  <tr
                    key={deposit.id}
                    className="border-t border-gray-800 hover:bg-gray-800 transition"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-white font-medium">
                          {deposit.userName}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {deposit.userEmail}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-white font-mono font-semibold">
                        {deposit.amount} DGB
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-300 font-mono text-xs">
                        {deposit.txid.substring(0, 20)}...
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`${
                          deposit.confirmations >= 6
                            ? "text-green-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {deposit.confirmations}/6
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                          deposit.status === "confirmed"
                            ? "bg-green-600 text-white"
                            : deposit.status === "pending"
                              ? "bg-yellow-600 text-white"
                              : "bg-red-600 text-white"
                        }`}
                      >
                        {deposit.status === "confirmed" && <FaCheckCircle />}
                        {deposit.status === "pending" && <FaClock />}
                        {deposit.status === "failed" && <FaExclamationCircle />}
                        {deposit.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-300 text-sm">
                      {deposit.createdAt}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedDeposit(deposit)}
                          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        {deposit.status === "confirmed" && (
                          <button
                            onClick={() => handleReverseCredit(deposit)}
                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
                            title="Reverse Credit"
                          >
                            <FaUndo />
                          </button>
                        )}
                        {deposit.status === "failed" && (
                          <button
                            onClick={() => {
                              setSelectedDeposit(deposit);
                              setShowManualCreditModal(true);
                            }}
                            className="p-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
                            title="Manual Credit"
                          >
                            <FaPlus />
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

      {/* Deposit Details Modal */}
      {selectedDeposit && !showManualCreditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="darkCard p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-xl font-bold">Deposit Details</h2>
              <button
                onClick={() => setSelectedDeposit(null)}
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
                    {selectedDeposit.userName}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {selectedDeposit.userEmail}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs mt-1 ${
                      selectedDeposit.status === "confirmed"
                        ? "bg-green-600 text-white"
                        : selectedDeposit.status === "pending"
                          ? "bg-yellow-600 text-white"
                          : "bg-red-600 text-white"
                    }`}
                  >
                    {selectedDeposit.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Amount</p>
                  <p className="text-white font-bold text-xl">
                    {selectedDeposit.amount} DGB
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Credited Amount</p>
                  <p className="text-green-400 font-bold text-xl">
                    {selectedDeposit.creditedAmount} DGB
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-1">Transaction ID</p>
                <p className="text-white font-mono text-sm break-all bg-gray-800 p-2 rounded">
                  {selectedDeposit.txid}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-1">Deposit Address</p>
                <p className="text-white font-mono text-sm bg-gray-800 p-2 rounded">
                  {selectedDeposit.depositAddress}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Confirmations</p>
                  <p className="text-white font-semibold">
                    {selectedDeposit.confirmations}/6
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Created At</p>
                  <p className="text-white">{selectedDeposit.createdAt}</p>
                </div>
              </div>

              {selectedDeposit.confirmedAt && (
                <div>
                  <p className="text-gray-400 text-sm">Confirmed At</p>
                  <p className="text-white">{selectedDeposit.confirmedAt}</p>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setSelectedDeposit(null)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
              >
                Close
              </button>
              {selectedDeposit.status === "failed" && (
                <button
                  onClick={() => setShowManualCreditModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <FaPlus /> Manual Credit
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Manual Credit Modal */}
      {showManualCreditModal && selectedDeposit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="darkCard p-6 max-w-md w-full">
            <h2 className="text-white text-xl font-bold mb-4">Manual Credit</h2>

            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">User</p>
              <p className="text-white font-medium">
                {selectedDeposit.userName}
              </p>
              <p className="text-gray-400 text-xs">
                {selectedDeposit.userEmail}
              </p>
            </div>

            <div className="mb-4">
              <label className="text-gray-400 text-sm mb-2 block">
                Amount to Credit (DGB) *
              </label>
              <input
                type="number"
                value={manualCreditAmount}
                onChange={(e) => setManualCreditAmount(e.target.value)}
                placeholder="Enter amount"
                step="0.01"
                className="w-full fadeInput rounded-lg px-4 py-2 text-white"
              />
            </div>

            <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-3 mb-4">
              <p className="text-yellow-400 text-sm">
                ⚠️ Manual credits should only be used for support cases and will
                be logged for auditing purposes.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowManualCreditModal(false);
                  setManualCreditAmount("");
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleManualCredit}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
              >
                Confirm Credit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
