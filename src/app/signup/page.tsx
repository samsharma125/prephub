"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";


export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "admin">("student");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
 // PAGE LOADER
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 2000); // 4.5 sec
    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0B1739]">
        <Loader />
      </div>
    );
  }


  
  const handleSignup = async () => {
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setSuccess("Account created! Redirecting...");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setError(data.error || "Signup failed");
      }
    } catch {
      setError("Network error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1739] px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl">
        
        {/* Title */}
        <h2 className="text-center text-3xl font-bold text-white mb-2">
          Create your account
        </h2>
        <p className="text-center text-blue-300 mb-6 text-sm">
          Join PrepHub to get started
        </p>

        {/* Full Name */}
        <label className="text-gray-300 font-medium text-sm">Full Name</label>
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 mt-1 mb-4 rounded-lg bg-transparent border border-gray-500 placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <label className="text-gray-300 font-medium text-sm">Email Address</label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full p-3 mt-1 mb-4 rounded-lg bg-transparent border border-gray-500 placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <label className="text-gray-300 font-medium text-sm">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full p-3 mt-1 mb-4 rounded-lg bg-transparent border border-gray-500 placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Role selection */}
        <label className="text-gray-300 font-medium text-sm">Sign up as</label>
        <select
          className="w-full p-3 mt-1 mb-4 rounded-lg bg-transparent border border-gray-500 text-white focus:ring-2 focus:ring-blue-500 cursor-pointer"
          value={role}
          onChange={(e) => setRole(e.target.value as "student" | "admin")}
        >
          <option className="text-black" value="student">Student</option>
          <option className="text-black" value="admin">Faculty Admin</option>
        </select>

        {/* Error / Success */}
        {error && (
          <p className="text-red-400 bg-red-900/20 p-2 rounded-lg border border-red-700 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-400 bg-green-900/20 p-2 rounded-lg border border-green-700 text-sm mb-3 text-center">
            {success}
          </p>
        )}

        {/* Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
        >
          Sign Up
        </button>

        {/* Bottom Link */}
        <p className="text-sm mt-6 text-center text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
