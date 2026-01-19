"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGraduationCap } from "react-icons/fa";

const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("LOGIN RESPONSE:", res);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    // Redirect to dashboard on successful login
    router.push("/dashboard");
  };

  return (
    <div className="h-screen w-full flex items-center justify-center px-7">
      {/* Login in */}
      <div className="bg-white py-10 px-2.5 text-center rounded-md shadow-md w-full">
        {/* Logo */}
        <div className="relative w-16 h-16 rounded-full bg-[#8B2E2E] mx-auto flex items-center justify-center">
          <img src="/invertedLogo.png" alt="Logo" className="object-contain" />
        </div>
        <h1 className="text-[30px] font-semibold">Welcome Back</h1>
        <p>Enter your credentials to access your exams</p>

        {/* Log in form */}
        <form onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="my-2.5 flex flex-col gap-4 px-4">
            {/* email address */}
            <div className="flex flex-col gap-0.5 text-left">
              <label htmlFor="email">Email Address</label>
              <input
                type="text"
                placeholder="Enter Email Address"
                className="bg-[#d3d3d3c2] rounded-md px-2 py-1"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-0.5 text-left">
              <label
                htmlFor="password"
                className="w-full flex flex-row justify-between"
              >
                Password{" "}
                <span className="text-[#8B2E2E]">forgot password?</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="bg-[#d3d3d3c2] rounded-md px-2 py-1"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="mt-5 w-full py-2 redBg text-white rounded-lg cursor-pointer">
              Login to Portal
            </button>
          </div>
        </form>

        <div>
          <p>
            Don&apos;t have an account?{" "}
            <Link href={"/register"}>
              <span className="font-bold redtext cursor-pointer">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
