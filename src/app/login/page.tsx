"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "admin">("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200 relative">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome to <span className="text-blue-600">PrepHub</span>
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="text-gray-700 font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-gray-700 font-semibold">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Role Selection */}
       <div className="mb-4">
  <label className="text-gray-700 font-semibold mb-1 block">
    Login as
  </label>

  <div className="relative">
    <select
      className="w-full appearance-none p-3 border rounded-lg bg-white text-gray-700 font-medium 
                 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
      value={role}
      onChange={(e) => setRole(e.target.value as "student" | "admin")}
    >
      <option value="student">Student</option>
      <option value="admin">Faculty Admin</option>
    </select>

    {/* Down Arrow Icon */}
    <span className="absolute right-3 top-3.5 text-gray-500 pointer-events-none">
      ▼
    </span>
  </div>
</div>

        {/* Error message */}
        {error && (
          <p className="text-red-500 mb-3 font-medium text-center bg-red-50 py-2 rounded-lg border border-red-200">
            {error}
          </p>
        )}

        {/* Login button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-sm mt-6 text-center text-gray-700">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
