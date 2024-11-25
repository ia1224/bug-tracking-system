"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ExpertLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy validation
    if (email === "expert@srm.com" && password === "nwc@expert") {
      localStorage.setItem("isExpertLoggedIn", "true");
      router.push("/expert-dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-teal-200 flex flex-col justify-center items-center text-black">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Expert Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="border p-3 w-full rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border p-3 w-full rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <span className="ml-2 text-gray-700">Show Password</span>
            </label>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-green-600 transition duration-200 w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
