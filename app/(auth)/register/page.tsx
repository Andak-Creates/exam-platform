import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/invertedLogo.png";

const page = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center px-7 md:px-40 max-w-225 mx-auto">
      {/* Login in */}
      <div className="bg-white py-10 px-2.5 text-center rounded-md shadow-md w-full">
        {/* Logo */}
        <div className="relative w-20 h-20 mx-auto mb-4 bg-[#8B2E2E] rounded-full flex items-center justify-center">
          <Image src={Logo} alt="Logo" className="object-contain" fill />
        </div>
        <h1 className="text-[30px] font-semibold">Welcome To Nocho</h1>
        <p>Create an account to get started with us now</p>

        {/* Log in form */}
        <form action="">
          <div className="my-2.5 flex flex-col gap-4 px-4">
            {/* Name and NickName holder */}
            <div className=" flex flex-row items-center justify-between ">
              {/* full name */}
              <div className="flex flex-col gap-0.5 text-left w-[48%]">
                <label htmlFor="fullname">Full name:</label>
                <input
                  type="text"
                  placeholder="Enter Your Full Name"
                  className="bg-[#d3d3d3c2] rounded-md px-2 py-1"
                  required
                />
              </div>

              {/* nickname */}
              <div className="flex flex-col gap-0.5 text-left w-[48%]">
                <label htmlFor="nickname">Nickname:</label>
                <input
                  type="text"
                  placeholder="Enter Your Nickame"
                  className="bg-[#d3d3d3c2] rounded-md px-2 py-1"
                  required
                />
              </div>
            </div>

            {/* email address */}
            <div className="flex flex-col gap-0.5 text-left">
              <label htmlFor="email">Email Address</label>
              <input
                type="text"
                placeholder="Enter Email Address"
                className="bg-[#d3d3d3c2] rounded-md px-2 py-1"
                required
              />
            </div>

            {/* Password holder */}
            <div className=" flex flex-row items-center justify-between ">
              {/* Password */}
              <div className="flex flex-col gap-0.5 text-left w-[48%]">
                <label htmlFor="password">Password </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="bg-[#d3d3d3c2] rounded-md px-2 py-1"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-0.5 text-left w-[48%]">
                <label htmlFor="confirm-password">Confirm Password </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="bg-[#d3d3d3c2] rounded-md px-2 py-1"
                  required
                />
              </div>
            </div>

            <button className="mt-5 w-full py-2 redBg text-white rounded-lg cursor-pointer">
              Login to Portal
            </button>
          </div>
        </form>

        <div>
          <p>
            Already have an account?{" "}
            <Link href={"/login"}>
              <span className="font-bold redtext cursor-pointer">Log In</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
