"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function LoginPage() {
  const router = useRouter();

  const [pageLoading, setPageLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "admin">("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // -------- PAGE LOADER --------
  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#081A3E]">
        <Loader />
      </div>
    );
  }

  // -------- LOGIN FUNCTION --------
  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        router.push(role === "admin" ? "/faculty" : "/dashboard");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#081A3E] px-4">
      <div className="bg-[#0D224F] p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#1B345F]">
        
        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <div className="w-10 h-10 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 text-2xl font-bold">
            ✖
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center text-white">
          Welcome Back to PrepHub
        </h2>
        <p className="text-center text-gray-400 text-sm mb-6">
          Sign in to access your dashboard.
        </p>

        {/* ROLE TOGGLE */}
        <div className="flex mb-5 bg-[#0A1C3A] p-1 rounded-lg border border-[#1C3056]">
          <button
            onClick={() => setRole("student")}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
              role === "student"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-[#13274E]"
            }`}
          >
            Student
          </button>

          <button
            onClick={() => setRole("admin")}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
              role === "admin"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-[#13274E]"
            }`}
          >
            Admin
          </button>
        </div>

        {/* EMAIL */}
        <label className="text-gray-300 text-sm font-medium">Email Address</label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full mt-1 mb-4 p-3 bg-[#0A1C3A] border border-[#1C3056] text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <label className="text-gray-300 text-sm font-medium">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full mt-1 mb-4 p-3 bg-[#0A1C3A] border border-[#1C3056] text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ERROR */}
        {error && (
          <p className="text-red-400 text-center bg-red-900/20 border border-red-700 py-2 rounded-lg mb-4">
            {error}
          </p>
        )}

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Log in"}
        </button>

        {/* FOOTER */}
        <p className="text-sm mt-6 text-center text-gray-300">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
