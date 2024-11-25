"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Check admin credentials
    if (email === "admin@srm.com" && password === "nwc@admin") {
      localStorage.setItem("isAdminLoggedIn", "true");
      router.push("/admin-panel"); // Redirect to the admin panel
    } else {
      alert("Invalid admin credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-indigo-200 text-black">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition duration-500 hover:shadow-xl hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Admin Panel Login
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700">
              Admin Email
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
              Admin Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-indigo-600"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <span className="ml-2 text-gray-700">Show Password</span>
              </label>
            </div>
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
