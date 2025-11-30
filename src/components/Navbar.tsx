"use client";

import { useState } from "react";
import Link from "next/link";
import { getAuth } from "@/lib/auth";

export default function Navbar() {
  const auth = getAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b shadow-sm z-50 px-6 py-3 flex items-center justify-between">
      
      {/* LEFT LOGO */}
      <Link href="/dashboard">
        <span className="text-xl font-bold text-black cursor-pointer">PrepHub</span>
      </Link>

      {/* RIGHT PROFILE AVATAR */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold"
        >
          {auth?.name?.charAt(0).toUpperCase()}
        </button>

        {/* DROPDOWN MENU */}
        {open && (
          <div className="absolute right-0 mt-2 w-60 bg-white border shadow-lg rounded-lg p-4 z-50">
            <p className="text-gray-900 text-lg font-semibold">{auth?.name}</p>
            <p className="text-sm text-gray-500">{auth?.email}</p>

            <div className="my-3 border-t"></div>

          <button
  onClick={async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
      redirect: "follow",
    });

    // If API already redirected, browser follows automatically
    if (res.redirected) {
      window.location.href = res.url;
      return;
    }

    // Fallback redirect (rare case)
    window.location.href = "/login";
  }}
  className="
    w-full text-left 
    px-4 py-3 
    text-red-400 text-sm 
    hover:bg-[#3b0f14]/60 
    hover:text-red-300 
    transition-all
  "
>
  Sign Out
</button>

          </div>
        )}
      </div>
    </nav>
  );
}
