import Link from "next/link";
import { FaNairaSign, FaTrophy, FaWallet } from "react-icons/fa6";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

const ResultPage = ({
  searchParams,
}: {
  params: { examId: string };
  searchParams: {
    score?: string;
    time?: string;
    rank?: string;
    reward?: string;
  };
}) => {
  const score = Number(searchParams.score ?? 0);
  const timeInSeconds = Number(searchParams.time ?? 0);
  const rank = Number(searchParams.rank ?? 0);
  const reward = Number(searchParams.reward ?? 0);

  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  const getRankStyles = (index: number) => {
    if (index === 0) {
      return {
        text: "text-yellow-400",
        bg: "bg-yellow-400/10 border-yellow-400/30",
      };
    }
    if (index === 1) {
      return {
        text: "text-gray-300",
        bg: "bg-gray-300/10 border-gray-300/30",
      };
    }
    if (index === 2) {
      return {
        text: "text-orange-400",
        bg: "bg-orange-400/10 border-orange-400/30",
      };
    }
    return {
      text: "text-[#aaa]",
      bg: "bg-[#00000030] border-[#ffffff10]",
    };
  };

  return (
    <div className="w-full mb-25 text-white max-w-300 mx-auto">
      {/* congratulations box */}
      <div className="md:w-[95%] lg:w-[90%] h-auto bg-linear-to-r from-[#8B1E1E] to-[#250808] border border-[#aaa] mx-auto rounded-3xl shadow-lg px-5 md:px-10 py-6">
        {/* Trophy */}
        <div className="p-4 w-fit mx-auto rounded-lg bg-[#ffffff56] border border-[#ffffff20]">
          <FaTrophy color="gold" size={40} />
        </div>

        {/* Congatulations */}
        <div className="text-center mt-4">
          <h2 className="text-[20px] font-semibold">
            Congatulations, UserName!
          </h2>
          <p className="text-[#aaa] mt-2">
            You outperformed 80% of participants and ranked{" "}
            <span className="underline text-white font-semibold">#{rank}</span>{" "}
            globally.
          </p>
        </div>

        {/* Score and prize */}
        <div className="mt-5  w-full flex flex-col md:flex-row items-center justify-center gap-4">
          {/* Scores */}
          <div className="w-full md:w-[50%] flex flex-row items-center gap-4">
            {/* Final Score */}
            <div className="text-[#aaa] w-full p-4 text-center rounded-lg bg-[#ffffff10] border border-[#ffffff20]">
              <p className="uppercase text-[12px]">Final Score</p>
              <p className="text-white font-semibold text-[20px]">
                {score}
                <span className="text-[#aaa] text-[14px]">/100</span>
              </p>
            </div>

            {/* Completion */}
            <div className="text-[#aaa] w-full p-4 text-center rounded-lg bg-[#ffffff10] border border-[#ffffff20]">
              <p className="uppercase text-[12px]">Completion</p>
              <p className="text-white font-semibold text-[20px]">
                {minutes}
                <span className="text-[#aaa] text-[14px]">m</span> {seconds}
                <span className="text-[#aaa] text-[14px]">s</span>
              </p>
            </div>
          </div>

          {/* Prize reward */}
          <div className="text-[#aaa] w-full md:w-1/2 p-4 text-center h-fit rounded-lg bg-[#ffffff10] border border-[#ffffff20]">
            <p className="uppercase text-[12px] flex flex-row gap-2 items-center justify-center">
              <span>
                <FaWallet />{" "}
              </span>{" "}
              Prize Reward
            </p>
            <p className="text-white font-semibold text-[20px] flex items-center justify-center">
              <FaNairaSign />
              {reward.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex flex-col gap-5">
          <Link
            href={"/dashboard"}
            className="bg-[#00000020] py-3 px-4 text-white font-semibold rounded-2xl flex flex-row items-center justify-center gap-2 mx-auto border border-[#aaa] cursor-pointer"
          >
            <span>
              <MdOutlineAccountBalanceWallet />{" "}
            </span>{" "}
            Back To Dashboard
          </Link>
        </div>
      </div>

      {/* Global Leaderboard */}
      <div className="md:w-[95%] lg:w-[90%] mt-8 mx-auto bg-[#ffffff10] border border-[#ffffff20] rounded-3xl shadow-lg px-6 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <FaTrophy color="gold" size={20} />
          <h3 className="text-[18px] font-semibold">Global Leaderboard</h3>
        </div>

        <p className="text-[#aaa] text-sm mb-4">Live Results</p>

        {/* Leaderboard List */}
        <div className="flex flex-col gap-3">
          {[
            "AceBrain",
            "QuantumKid",
            "NovaMind",
            "LogicLord",
            "ByteQueen",
            "ThinkFast",
            "BrainiacX",
          ].map((name, index) => {
            const styles = getRankStyles(index);

            return (
              <div
                key={index}
                className={`flex items-center justify-between rounded-xl px-4 py-3 border ${styles.bg}`}
              >
                <div className="flex items-center gap-4">
                  <span className={`font-semibold ${styles.text}`}>
                    #{index + 1}
                  </span>
                  <span className="font-medium">{name}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* See More */}
        <button className="mt-5 w-full py-3 bg-[#00000040] border border-[#ffffff30] rounded-xl text-sm text-white font-semibold hover:bg-[#00000060] transition">
          See remaining 1,230 participants
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
