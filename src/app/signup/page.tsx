"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "admin">("student");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
        setSuccess("Account created! Redirecting to login...");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setError(data.error || "Signup failed");
      }
    } catch {
      setError("Network error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create an Account
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="text-gray-700 font-semibold">Full Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 mt-1 border rounded-lg text-black placeholder:text-gray-400 
            focus:ring-2 focus:ring-blue-500 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-gray-700 font-semibold">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full p-3 mt-1 border rounded-lg text-black placeholder:text-gray-400 
            focus:ring-2 focus:ring-blue-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-gray-700 font-semibold">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-3 mt-1 border rounded-lg text-black placeholder:text-gray-400 
            focus:ring-2 focus:ring-blue-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Role Dropdown */}
        <div className="mb-4">
          <label className="text-gray-700 font-semibold">Sign up as</label>
          <select
            className="w-full p-3 mt-1 border rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500"
            value={role}
            onChange={(e) => setRole(e.target.value as "student" | "admin")}
          >
            <option value="student">Student</option>
            <option value="admin">Faculty Admin</option>
          </select>
        </div>

        {/* Messages */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        {/* Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Sign Up
        </button>

        <p className="text-sm mt-4 text-center text-gray-700">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-semibold underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
