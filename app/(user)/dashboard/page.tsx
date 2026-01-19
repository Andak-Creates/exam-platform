import { BiSolidBank } from "react-icons/bi";
import { FaCalendar, FaPlusCircle, FaRegClock } from "react-icons/fa";
import { FaMoneyBills, FaNairaSign } from "react-icons/fa6";
import { HiOutlineBolt } from "react-icons/hi2";

const page = () => {
  return (
    <div className="w-full mb-25 text-white max-w-300 lg:mx-auto">
      {/* Wallet balance and stats */}
      <div className=" flex flex-col md:flex-row md:w-[95%] lg:w-[90%] mx-auto mt-6 gap-4">
        {/* Wallet balance */}
        <div className="w-full md:w-[55%] relative md:h-auto flex flex-col items-start h-64  bg-linear-to-r from-[#8B1E1E] to-[#250808] rounded-2xl p-5">
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
          <div className="bg-[#0a0e14] w-full h-full rounded-lg p-4">
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

              {/* Global rank */}
              <div className="flex flex-row w-full justify-between border-b-[0.5px] border-[#aaa] py-2">
                <p>Global rank</p>
                <span className="font-semibold text-[18px] text-[#94A3B8]">
                  #1,204
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
      <div className="w-full h-auto bg-[#0a0e14] flex flex-col md:flex-row md:w-[95%] lg:w-[90%] mx-auto mt-6 text-white rounded-2xl border-[0.5px] border-[#aaa] justify-between p-4 items-start md:items-center">
        {/* Exam details */}
        <div className="flex gap-4 items-center w-full md:w-[70%] ">
          {/* time icon */}
          <div className="p-2 rounded-full bg-[#FEF2F2]">
            <FaRegClock size={25} color="#8B1E1E" />
          </div>

          <div>
            <h2 className="text-[20px] text-white font-semibold">
              Math Olympiad Finals{" "}
              <span className="py-1 inline-block md:ml-4 px-6 bg-green-200 text-[#0a0e14] text-[14px] rounded-full uppercase font-semibold">
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
          <button className="md:w-fit w-full px-5 py-1 bg-[#8B1E1E] rounded-lg">
            Enter Exam Room
          </button>
        </div>
      </div>

      {/* Upcoming Exams */}
      <div className=" md:w-[95%] lg:w-[90%] mx-auto mt-10">
        <h3 className="text-[18px] font-semibold">
          Upcoming Exams <span className="text-[#aaa]">(2)</span>
        </h3>

        {/* Exams */}
        <div className="mt-5 flex flex-row flex-wrap  gap-10">
          {/* exam card 1 */}
          <div className=" bg-white rounded-lg shadow-md overflow-hidden border w-full md:w-70">
            {/* Image + Tag */}
            <div className="relative w-full  h-fit">
              <img
                src="/mathpic.png"
                alt="Exam Image"
                className="object-cover w-full"
              />
              {/* Tag overlay */}
              <span className="absolute bottom-3 left-2 bg-[#8B1E1E] text-white text-xs font-semibold px-2 py-1 rounded">
                Physics
              </span>
            </div>

            {/* Exam info */}
            <div className="p-4 flex flex-col gap-2 bg-[#8B1E1E] text-white">
              {/* Name, Date, Time */}
              <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-lg">Physics 101 Exam</h2>
                <div className="flex text-[#aaa] text-sm gap-2">
                  <span className="flex flex-row gap-2 items-center">
                    <FaCalendar size={14} color="white" /> Tomorrow,
                  </span>
                  <span>10:00 AM</span>
                </div>
              </div>

              {/* Separator */}
              <hr className="border-gray-200 my-2" />

              {/* Prize Pool */}
              <div className="flex justify-between text-sm">
                <div>
                  <p className="">Prize</p>
                  <p className="font-bold text-[#0F172A]">₦5,000</p>
                </div>
                <div>
                  <p className="">Entry Fee</p>
                  <p className="font-bold text-[#0F172A]">₦50</p>
                </div>
              </div>

              {/* Register Button */}
              <button className="mt-4 w-full py-2 bg-white font-semibold cursor-pointer text-black rounded-lg hover:bg-[#0a0e14] hover:text-white transition">
                Register Now
              </button>
            </div>
          </div>

          {/* exam card 2 */}
          <div className="md:w-70 bg-white rounded-lg shadow-md overflow-hidden border">
            {/* Image + Tag */}
            <div className="relative w-full  h-fit">
              <img
                src="/chempic.png"
                alt="Exam Image"
                className="object-cover w-full"
              />
              {/* Tag overlay */}
              <span className="absolute bottom-3 left-2 bg-[#8B1E1E] text-white text-xs font-semibold px-2 py-1 rounded">
                Chemistry
              </span>
            </div>

            {/* Exam info */}
            <div className="p-4 flex flex-col gap-2 bg-[#8B1E1E] text-white">
              {/* Name, Date, Time */}
              <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-lg">Chemistry 201 Exam</h2>
                <div className="flex text-[#aaa] text-sm gap-2">
                  <span className="flex flex-row gap-2 items-center">
                    <FaCalendar size={14} color="white" /> Saturday 16/1/26,
                  </span>
                  <span>10:00 AM</span>
                </div>
              </div>

              {/* Separator */}
              <hr className="border-gray-200 my-2" />

              {/* Prize Pool */}
              <div className="flex justify-between text-sm">
                <div>
                  <p className="">Prize</p>
                  <p className="font-bold text-[#0F172A]">₦5,000</p>
                </div>
                <div>
                  <p className="">Entry Fee</p>
                  <p className="font-bold text-[#0F172A]">₦50</p>
                </div>
              </div>

              {/* Register Button */}
              <button className="mt-4 w-full py-2 bg-white font-semibold cursor-pointer text-black rounded-lg hover:bg-[#0a0e14] hover:text-white transition">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
