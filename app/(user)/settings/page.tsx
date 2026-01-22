"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

export default function SettingsPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Don't auto-redirect
    router.push("/"); // Force client redirect
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-lg bg-linear-to-r from-[#8B1E1E] to-[#250808] rounded-3xl shadow-lg p-8 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-full bg-[#ffffff20] flex items-center justify-center">
            <FaUser size={40} />
          </div>
          <p className="text-xl font-semibold">
            {session?.user?.name || "Guest"}
          </p>
          <p className="text-sm text-[#aaa]">{session?.user?.email || ""}</p>
        </div>

        <p className="text-center text-[#d7d6d6]">
          Here you can manage your account settings and securely log out of your
          session.
        </p>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl font-semibold shadow-md text-white transition text-lg"
        >
          <FaSignOutAlt />
          Log Out
        </button>
      </div>
    </div>
  );
}
