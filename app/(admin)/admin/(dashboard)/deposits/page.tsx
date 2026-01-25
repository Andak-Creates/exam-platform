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

type DepositStatusFilter = "all" | "confirmed" | "pending" | "failed";

export default function DepositsPage() {
  const [deposits] = useState(mockDeposits);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<DepositStatusFilter>("all");
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
        <OverViewCard title="Total Deposits" value={`${totalDeposits}`} />
        <OverViewCard title="Confirmed" value={`${confirmedDeposits}`} />
        <OverViewCard title="Pending" value={`${pendingDeposits}`} />
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
              onChange={(e) =>
                setFilterStatus(e.target.value as DepositStatusFilter)
              }
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

      {/* Rest of the code unchanged */}
      {/* ... */}
    </div>
  );
}
