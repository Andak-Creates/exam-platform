"use client";

import Link from "next/link";
import { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCopy,
  FaPlusCircle,
} from "react-icons/fa";
import {
  FaArrowRight,
  FaCirclePlus,
  FaMoneyBills,
  FaNairaSign,
} from "react-icons/fa6";

const page = () => {
  const historyTab = [
    { key: "all", label: "All" },
    { key: "deposits", label: "Deposits" },
    { key: "withdrawals", label: "Withdrawals" },
    { key: "Fees", label: "Fees" },
    { key: "winnings", label: "Winnings" },
  ] as const;

  const [activeTab, setActiveTab] = useState("all");

  // Sample transaction data
  const transactions = [
    {
      id: 1,
      date: "2024-01-15",
      time: "10:30 AM",
      description: "Wallet Deposit",
      type: "deposits",
      amount: 5000,
      status: "Completed",
    },
    {
      id: 2,
      date: "2024-01-14",
      time: "03:45 PM",
      description: "Math Olympiad Prize",
      type: "winnings",
      amount: 15000,
      status: "Completed",
    },
    {
      id: 3,
      date: "2024-01-13",
      time: "11:20 AM",
      description: "Platform Fee",
      type: "fees",
      amount: -500,
      status: "Completed",
    },
    {
      id: 4,
      date: "2024-01-12",
      time: "09:15 AM",
      description: "Withdrawal to Bank",
      type: "withdrawals",
      amount: -7000,
      status: "Processing",
    },
  ];

  const filteredTransactions =
    activeTab === "all"
      ? transactions
      : transactions.filter((t) => t.type === activeTab);

  return (
    <div className="text-white pb-30 w-full">
      <h1 className="text-[30px]">Overview</h1>
      {/* Bento Grid */}
      <div className="mt-5 flex flex-col md:flex-row gap-5">
        {/* Left side of grid */}
        <div className="w-full md:w-[60%] flex flex-col gap-5 ">
          {/* Wallet Balance */}
          <div className="w-full border border-[#aaa] md:w-full relative md:h-auto flex flex-col md:flex-row items-start justify-between  bg-linear-to-r from-[#8B1E1E] to-[#250808] rounded-2xl p-5 ">
            {/* Wallet and details */}
            <div>
              <p className="uppercase text-[14px]">Total Wallet balance</p>

              {/* Balance */}
              <div className="flex flex-row items-center gap-1 font-bold text-white mt-2">
                <FaNairaSign size={40} />
                <h1 className="text-[40px] ">
                  12,500<span className="text-[30px] text-[#aaa]">.00</span>
                </h1>
              </div>

              <p className="text-[#aaa] text-[12px]">0 ~ 45,000,00 DGB</p>
            </div>

            {/* Button */}
            <div className="flex w-fit self-end">
              {/* Withdraw button */}
              <button className="flex flex-row gap-1 font-semibold items-center bg-white p-2 rounded-lg cursor-pointer  text-[#8B1E1E]">
                <FaMoneyBills />
                Withdraw Funds
              </button>
            </div>
          </div>

          {/* Transaction History */}
          <div className="w-full h-full bg-[#0a0e14] rounded-lg border border-[#aaa]">
            {/* Title and filters */}
            <div className="p-6 w-full flex flex-row items-center justify-between flex-wrap gap-5">
              <h2 className="text-white font-semibold">Transaction History</h2>

              {/* Filters */}
              <div className="flex gap-2 bg-[#61616141] rounded-xl p-1 self-baseline">
                {historyTab.map((tab) => (
                  <button
                    className={`p-1 rounded-lg cursor-pointer text-[12px] ${tab.key === activeTab ? "bg-white text-black" : ""}`}
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Transaction Table */}
            <div className="px-6 pb-6 flex-1 flex flex-col">
              <div className="flex-1 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#61616141]">
                      <th className="text-left py-3 text-[#aaa] font-medium text-[14px]">
                        Date & Time
                      </th>
                      <th className="text-left py-3 text-[#aaa] font-medium text-[14px]">
                        Description
                      </th>
                      <th className="text-left py-3 text-[#aaa] font-medium text-[14px]">
                        Type
                      </th>
                      <th className="text-left py-3 text-[#aaa] font-medium text-[14px]">
                        Amount
                      </th>
                      <th className="text-left py-3 text-[#aaa] font-medium text-[14px]">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b border-[#61616141]"
                      >
                        <td className="py-4 text-[12px]">
                          <div>{transaction.date}</div>
                          <div className="text-[#aaa] text-[10px]">
                            {transaction.time}
                          </div>
                        </td>
                        <td className="py-4 text-[14px]">
                          {transaction.description}
                        </td>
                        <td className="py-4 text-[14px] capitalize">
                          {transaction.type}
                        </td>
                        <td
                          className={`py-4 text-[14px] font-semibold ${transaction.amount > 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          <div className="flex flex-row items-center">
                            <FaNairaSign size={14} />
                            {Math.abs(transaction.amount).toLocaleString()}
                          </div>
                        </td>
                        <td className="py-4 text-[14px]">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] ${
                              transaction.status === "Completed"
                                ? "bg-green-500/20 text-green-500"
                                : "bg-yellow-500/20 text-yellow-500"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="mt-6 flex flex-row items-center justify-between">
                <p className="text-[14px] text-[#aaa]">
                  Showing 1 to {filteredTransactions.length} of{" "}
                  {filteredTransactions.length} entries
                </p>
                <div className="flex flex-row gap-2">
                  <button className="p-2 bg-[#61616141] rounded-lg cursor-pointer hover:bg-[#616161] transition">
                    <FaChevronLeft size={14} />
                  </button>
                  <button className="p-2 bg-[#61616141] rounded-lg cursor-pointer hover:bg-[#616161] transition">
                    <FaChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side of grid */}
        <div className="w-full md:w-[35%] flex-1 flex justify-between flex-col">
          {/* Deposit card */}
          <div className="bg-[#0a0e14] p-5 rounded-2xl border border-[#aaa]">
            <div className="  flex flex-row gap-2 items-center">
              <FaPlusCircle color="#8B1E1E" />
              <h3 className="text-[18px] font-semibold">Deposit Funds</h3>
            </div>

            <div className="p-5 w-full flex items-center justify-center border bg-[#11111a] rounded-2xl mt-3">
              <img src="/qrCode.png" alt="qr code" className=" h-[150px]" />
            </div>

            {/* Your DGB Deposit Address */}
            <div className="mt-3">
              <p className="uppercase text-[14px] ">Digibyte Deposit address</p>
              <div className="mt-1 relative border py-1 px-2 overflow-hidden rounded-full">
                <p>dehejhsyshufuf74u4i4k00fineugghthth53</p>
                <div className="absolute right-0 px-2 bg-white top-0 h-full flex items-center justify-center cursor-pointer">
                  <FaCopy color="black" />
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="mt-3 rounded-lg text-[#8B1E1E] bg-[#FFF7ED] p-3 flex flex-row gap-2 items-start">
              <div className="font-bold">
                <CiCircleInfo size={20} className="font-bold" />
              </div>
              <p className="text-[14px]">
                Send only <span className="font-semibold">Digibyte (DGB)</span>{" "}
                to this address. Your balance will update automatically after{" "}
                <span className="font-semibold">6 network confirmations.</span>
              </p>
            </div>
          </div>

          {/* Go to exams */}
          <div className="bg-linear-to-r from-[#8B1E1E] to-[#250808] rounded-2xl p-5 mt-5 border border-[#aaa] h-full flex flex-col justify-center">
            <h3 className="font-semibold text-[20px]">Win Big In Olympiads!</h3>
            <p className="mt-2">
              Top 3 scorers in the Monthly Math Challenge win prize pool shares.
            </p>
            <Link
              href="/exams"
              className="mt-2 py-1 px-3 bg-[#ffffff70] rounded-lg flex flex-row gap-2 items-center w-fit hover:bg-white hover:text-black transition"
            >
              Go Too Exams{" "}
              <span>
                <FaArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
