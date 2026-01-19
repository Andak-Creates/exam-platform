import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 relative bg-black">
      <header className="w-full fixed top-0 left-0 flex items-center justify-between gap-5 bg-black text-white p-4 border border-gray-700">
        <h1 className="font-bold text-lg">ExamPro</h1>
        <Link
          href="/login"
          className="px-6 py-3 bg-white text-[#8B1E1E]  rounded-lg"
        >
          Get Started
        </Link>
      </header>

      <div className="md:w-[95%] lg:w-[90%] h-auto bg-linear-to-r from-[#8B1E1E] to-[#250808] mx-auto rounded-3xl shadow-lg px-10 py-6">
        <div className=" text-center text-white w-fit mx-auto">
          <img src="invertedLogo.png" alt="logo" />
        </div>
        <h2 className="text-center text-white text-[35px] md:text-[50px] font-semibold mb-2">
          Elevate Your Potential
        </h2>
        <p className="text-center text-[#d7d6d6] mb-4">
          Compete in world-class academic challenges, earn recognition, and win
          prizes by passing our curated exams.
        </p>

        <div className="mx-auto w-fit flex flex-row gap-2 items-center">
          <Link
            href="/login"
            className="px-6 py-3 bg-white text-[#8B1E1E]  rounded-lg"
          >
            Get Started
          </Link>

          <button className=" px-6 py-3 border text-white rounded-md cursor-pointer text-left">
            About platform
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
