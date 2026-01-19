import {
  BiChevronLeft,
  BiChevronRight,
  BiFilter,
  BiTimer,
  BiWallet,
} from "react-icons/bi";
import { FaArrowRight, FaRegCheckCircle, FaTrophy } from "react-icons/fa";

const page = () => {
  return (
    <div className="text-white mb-40">
      {/* Page Title and description and filter */}
      <div>
        <h1 className="text-[40px] font-semibold">Exam Arena</h1>
        <p className="text-[#aaa]">
          Select an exam below to compete for cash prizes, use filters to narrow
          down your preferred subject or difficulty
        </p>

        {/* Filter */}
        <div className="flex flex-row gap-4 mt-8  items-center justify-end">
          <button className="py-2 px-4 redBg h-full rounded-lg cursor-pointer">
            All
          </button>

          <div className="py-2 px-4 h-full w-fit bg-white text-black cursor-pointer rounded-lg">
            <BiFilter size={20} />
          </div>
        </div>
      </div>

      {/* Exam Lists */}
      <div className="mt-5 flex flex-row flex-wrap  gap-10">
        {/* exam card 1 */}
        <div className="  rounded-lg shadow-md overflow-hidden w-full md:w-70  p-3 border-4 border-dashed border-green-700 cursor-pointer">
          {/* Image + Tag */}
          <div className="relative w-full  h-37">
            <img
              src="/mathpic.png"
              alt="Exam Image"
              className="object-cover w-full h-full"
            />
            {/* Tag overlay */}
            <span className="absolute top-3 left-2 text-white text-xs font-semibold px-2 py-1 rounded-lg uppercase flex flex-row items-center gap-2 bg-green-400">
              <FaRegCheckCircle /> Available
            </span>

            <div className="flex flex-col gap-1 absolute bottom-3 left-2 backdrop-blur-[2px] backdrop-brightness-90 p-3 rounded-md ">
              <h2 className="font-semibold text-lg">Mathematics Sprint</h2>
              <div className="flex text-[#aaa] text-sm gap-2">
                <span className="flex flex-row gap-2 items-center text-white">
                  <BiTimer size={14} color="white" /> Starts at
                </span>
                <span className="text-yellow-200 font-semibold">10:00 AM</span>
              </div>
            </div>
          </div>

          {/* Exam info */}
          <div className="p-4 flex flex-col gap-2  text-white bg-[#8B1E1E]">
            {/* Name, Date, Time */}

            {/* Prize Pool */}
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-[#aaa] uppercase text-[14px]">Prize Pool</p>
                <p className="text-[20px] font-bold ">₦5,000</p>
              </div>
              <div>
                <p className="text-[#aaa] uppercase text-[14px]">Entry Fee</p>
                <p className="font-bold text-right text-[20px]">₦50</p>
              </div>
            </div>

            {/* Separator */}
            <hr className="border-gray-200 my-2" />

            {/* Top Winners */}
            <div className="flex flex-row items-center gap-2 text-[#aaa]">
              <FaTrophy color="yellow" />
              <p className="text-[13px]">Top 3 winners take all</p>
            </div>

            {/* Register Button */}
            <button className="mt-4 w-full py-2 bg-white text-[14px] font-semibold cursor-pointer text-[#8B1E1E] rounded-lg hover:bg-[#b2b1b1]   transition flex flex-row gap-2 items-center justify-center">
              Enter Exam{" "}
              <span>
                <FaArrowRight />
              </span>
            </button>
          </div>
        </div>

        {/* Exam card 2 */}
        <div className=" bg-[#8B1E1E] rounded-lg shadow-md overflow-hidden border w-full md:w-70 cursor-pointer">
          {/* Image + Tag */}
          <div className="relative w-full  h-37">
            <img
              src="/chempic.png"
              alt="Exam Image"
              className="object-cover w-full h-full"
            />
            {/* Tag overlay */}
            <span className="absolute top-3 left-2 text-white text-xs font-semibold px-2 py-1 rounded-lg uppercase flex flex-row items-center gap-2 bg-green-400">
              <FaRegCheckCircle /> Available
            </span>

            <div className="flex flex-col gap-1 absolute bottom-3 left-2 backdrop-blur-[2px] backdrop-brightness-90 p-3 rounded-md ">
              <h2 className="font-semibold text-lg">Physics Championship</h2>
              <div className="flex text-[#aaa] text-sm gap-2">
                <span className="flex flex-row gap-2 items-center text-white">
                  <BiTimer size={14} color="white" /> Tomorrow
                </span>
                <span className="text-yellow-200 font-semibold">10:00 AM</span>
              </div>
            </div>
          </div>

          {/* Exam info */}
          <div className="p-4 flex flex-col gap-2 text-white">
            {/* Name, Date, Time */}

            {/* Prize Pool */}
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-[#aaa] uppercase text-[14px]">Prize Pool</p>
                <p className="text-[20px] font-bold ">₦50,000</p>
              </div>
              <div>
                <p className="text-[#aaa] uppercase text-[14px]">Entry Fee</p>
                <p className="font-bold text-right text-[20px]">₦50</p>
              </div>
            </div>

            {/* Separator */}
            <hr className="border-gray-200 my-2" />

            {/* Top Winners */}
            <div className="flex flex-row items-center gap-2 text-[#aaa]">
              <FaTrophy color="yellow" />
              <p className="text-[13px]">Top 10 winners share the pool</p>
            </div>

            {/* Register Button */}
            <button className="mt-4 w-full py-2 bg-white font-semibold text-[14px] cursor-pointer text-[#8B1E1E] rounded-lg hover:bg-[#b2b1b1]   transition flex flex-row gap-2 items-center justify-center">
              Register Now{" "}
              <span>
                <FaArrowRight />
              </span>
            </button>
          </div>
        </div>

        {/* Exam card 3 */}
        <div className=" bg-[#8B1E1E] rounded-lg shadow-md overflow-hidden border w-full md:w-70 cursor-pointer">
          {/* Image + Tag */}
          <div className="relative w-full  h-37">
            <img
              src="/chempic.png"
              alt="Exam Image"
              className="object-cover w-full h-full"
            />
            {/* Tag overlay */}
            <span className="absolute top-3 left-2 text-white text-xs font-semibold px-2 py-1 rounded-lg uppercase flex flex-row items-center gap-2 bg-[#8B1E1E]">
              <BiWallet /> Low balance
            </span>

            <div className="flex flex-col gap-1 absolute bottom-3 left-2 backdrop-blur-[2px] backdrop-brightness-90 p-3 rounded-md ">
              <h2 className="font-semibold text-lg">Physics Championship</h2>
              <div className="flex text-[#aaa] text-sm gap-2">
                <span className="flex flex-row gap-2 items-center text-white">
                  <BiTimer size={14} color="white" /> Tomorrow
                </span>
                <span className="text-yellow-200 font-semibold">10:00 AM</span>
              </div>
            </div>
          </div>

          {/* Exam info */}
          <div className="p-4 flex flex-col gap-2 text-white">
            {/* Name, Date, Time */}

            {/* Prize Pool */}
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-[#aaa] uppercase text-[14px]">Prize Pool</p>
                <p className="text-[20px] font-bold ">₦50,000</p>
              </div>
              <div>
                <p className="text-[#aaa] uppercase text-[14px]">Entry Fee</p>
                <p className="font-bold text-right text-[20px]">₦50</p>
              </div>
            </div>

            {/* Separator */}
            <hr className="border-gray-200 my-2" />

            {/* Top Winners */}
            <div className="flex flex-row items-center gap-2 text-[#aaa]">
              <FaTrophy color="yellow" />
              <p className="text-[13px]">Top 10 winners share the pool</p>
            </div>

            {/* Register Button */}
            <button className="mt-4 w-full py-2 bg-white font-semibold text-[14px] cursor-pointer text-[#8B1E1E] rounded-lg hover:bg-[#b2b1b1]   transition flex flex-row gap-2 items-center justify-center">
              Top Up Wallet{" "}
              <span>
                <BiWallet />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
