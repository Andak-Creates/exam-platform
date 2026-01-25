import Link from "next/link";
import { BiSolidBank } from "react-icons/bi";
import { FaPlusCircle, FaRegClock } from "react-icons/fa";
import { FaMoneyBills, FaNairaSign } from "react-icons/fa6";
import { HiOutlineBolt } from "react-icons/hi2";

const UserOverviewPage = () => {
  return (
    <div className="w-full mb-25 text-white max-w-300 lg:mx-auto">
      {/* Wallet balance and stats */}
      <div className=" flex flex-col md:flex-row md:w-[95%] lg:w-[90%] mx-auto mt-6 gap-4">
        {/* Wallet balance */}
        <div className="w-full md:w-[55%] relative md:h-auto flex flex-col items-start h-64  bg-linear-to-r from-[#8B1E1E] to-[#250808] rounded-3xl p-5">
          {/* bank and status */}
          <div className="flex w-full flex-row justify-between items-center">
            <div className="flex flex-row gap-1 items-center text-[#aaa]">
              <BiSolidBank size={25} />
              <p>Total Wallet balance</p>
            </div>

            <div className="py-[0.5px] px-4 bg-[#aaaaaa6b]  w-fit rounded-full text-white">
              Active
            </div>
          </div>

          {/* Balance */}
          <div className="flex flex-row items-center gap-1 font-bold text-white mt-2">
            <FaNairaSign size={40} />
            <h1 className="text-[40px] ">
              12,500<span className="text-[30px] text-[#aaa]">.00</span>
            </h1>
          </div>

          {/* Buttons */}
          <div className="flex flex-row flex-wrap gap-4 w-fit absolute bottom-4">
            <button className="flex flex-row gap-1 items-center bg-white py-2 px-6 rounded-lg cursor-pointer text-[#8B1E1E]">
              <FaPlusCircle />
              Deposit Funds
            </button>

            {/* Withdraw button */}
            <button className="flex flex-row gap-1 items-center border-[0.5px] border-[#aaa] py-2 px-6 rounded-lg cursor-pointer bg-[#8B1E1E] text-white">
              <FaMoneyBills />
              Withdraw Funds
            </button>
          </div>
        </div>

        {/* Stats section */}
        <div className=" border-4 border-dashed border-green-700 flex-1  p-2">
          <div className="bg-[#ffffff10] border border-[#ffffff20] rounded-3xl shadow-lg w-full h-full  p-4">
            {/* title and lightening */}
            <div className="flex flex-row gap-2">
              <HiOutlineBolt size={30} color="#F97316" />
              <h3 className="text-white font-semibold text-[20px]">Stats</h3>
            </div>

            {/* Exams and Ranks */}
            <div className="text-white flex flex-col gap-3">
              {/* Exams */}
              <div className="flex flex-row w-full justify-between border-b-[0.5px] border-[#aaa] py-2">
                <p>Exam</p>
                <span className="font-semibold text-[18px] text-[#94A3B8]">
                  24
                </span>
              </div>

              {/* Consecutive exams */}
              <div className="flex flex-row w-full justify-between border-b-[0.5px] border-[#aaa] py-2">
                <p>Consecutive exams</p>
                <span className="font-semibold text-[18px] text-[green]">
                  8
                </span>
              </div>

              <button className="py-2 rounded-lg mt-2 bg-[#8B1E1E]">
                View Leaderboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Started exams */}
      <div className="w-full h-auto bg-[#ffffff10] border border-[#ffffff20] rounded-3xl shadow-lg flex flex-col md:flex-row md:w-[95%] lg:w-[90%] mx-auto mt-6 text-white  justify-between p-4 items-start md:items-center">
        {/* Exam details */}
        <div className="flex gap-4 items-start md:items-center w-full md:w-[70%] ">
          {/* time icon */}
          <div className="p-2 rounded-full bg-[#FEF2F2] hidden md:flex">
            <FaRegClock size={25} color="#8B1E1E" />
          </div>

          <div>
            <h2 className="text-[20px] text-white font-semibold">
              Math Olympiad Finals{" "}
              <span className="py-1 inline-block md:ml-4 px-6 bg-green-200 text-[#0a0e14] text-[12px] my-2 md:my-0 md:text-[14px] rounded-full uppercase font-semibold">
                In Progress
              </span>
            </h2>
            <p className="text-[#aaa] mt-2">
              The session has started. You have 45 minutes remaining to complete
              all questions.
            </p>
          </div>
        </div>

        {/* Timer and action button */}
        <div className="flex flex-col w-full md:w-fit gap-2 md:mt-0 mt-4">
          <div className="flex flex-row items-center justify-end gap-2">
            <FaRegClock size={25} color="#8B1E1E" />
            <p>00:45:20</p>
          </div>
          <Link
            href={"/exams/live-exam"}
            className="md:w-fit w-full flex items-center justify-center px-5 py-1 bg-[#8B1E1E] rounded-lg"
          >
            Enter Exam Room
          </Link>
        </div>
      </div>

      <div className=" border-4 border-dashed border-green-700 flex-1  p-2 mt-5">
        <div className="bg-[#ffffff10] border border-[#ffffff20] rounded-3xl shadow-lg w-full h-full  p-4">
          <p>Awaiting Content</p>
        </div>
      </div>
    </div>
  );
};

export default UserOverviewPage;
