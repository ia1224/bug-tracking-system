// app/login/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "user@srm.com" && password === "nwc@user") {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard"); // Redirect to dashboard
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition duration-500 hover:shadow-xl hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Bug Tracking System
        </h1>
        <form onSubmit={handleLogin} className="text-black">
          <div className="mb-6 ">
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              className="mr-2 cursor-pointer"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <span className="text-sm text-gray-600">Show Password</span>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-lg"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
