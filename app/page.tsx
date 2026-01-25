"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/invertedLogo.png";
import Link from "next/link";
import { FaGraduationCap } from "react-icons/fa6";
import { useSession } from "next-auth/react";

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();

  // Redirect if logged in
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black px-4 pb-10 mt-5">
      {/* Top Header */}
      <header className="w-full fixed top-0 left-0 flex items-center justify-between gap-5 bg-black text-white p-4 border-b border-gray-700 z-50">
        {/* Logo Section */}
        <div className="flex justify-center items-center py-6 bg-black relative w-40 ml-5 h-8">
          <Image
            src={Logo}
            alt="logo"
            className="h-full w-full absolute object-cover"
          />
        </div>
        <Link
          href="/login"
          className="px-6 py-2 bg-white text-[#8B1E1E] rounded-lg font-semibold hover:bg-[#f3f3f3] transition"
        >
          Get Started
        </Link>
      </header>

      {/* Hero Section */}
      <section className="mt-20 md:mt-28 w-full md:w-[95%] lg:w-[90%] bg-linear-to-r from-[#8B1E1E] to-[#250808] rounded-2xl shadow-xl p-8 md:p-16 flex flex-col items-center gap-6 text-center ">
        {/* Logo */}
        <div className="flex justify-center items-center relative w-90 h-40">
          <Image
            src={Logo}
            alt="logo"
            className="h-full w-full absolute object-fill"
          />
        </div>

        <p className=" text-[#aaa] max-w-3xl -mt-10">
          Compete in world-class academic challenges, earn recognition, and win
          prizes by passing our curated exams.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <Link
            href="/login"
            className="px-6 py-3 bg-white text-[#8B1E1E] rounded-lg font-semibold hover:bg-[#f3f3f3] transition"
          >
            Get Started
          </Link>

          <button className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-[#8B1E1E] transition">
            About Platform
          </button>
        </div>
      </section>

      {/* Feature Section */}
      <section className="mt-5 md:mt-12 w-full md:w-[95%] lg:w-[90%] border-4 border-dashed border-green-700 p-4 text-white">
        <div className="flex flex-col items-center gap-4 bg-[#8B1E1E10] border border-[#ffffff20] rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <FaGraduationCap size={40} className="text-[#8B1E1E]" />
          <h3 className="text-xl font-semibold">World-Class Exams</h3>
          <p className="text-[#aaa] text-center">
            Take carefully curated exams designed to challenge and grow your
            knowledge.
          </p>
        </div>
      </section>
    </div>
  );
}
