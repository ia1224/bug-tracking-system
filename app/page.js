"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  // Functions to handle navigation
  const navigateToAdminPanel = () => {
    router.push("/admin-login");
  };

  const navigateToCustomerBugTracking = () => {
    router.push("/login");
  };

  const navigateToExpertPanel = () => {
    router.push("/expert-login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col justify-center items-center text-black">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        Welcome to the Bug Tracking System
      </h1>

      <div className="flex space-x-4">
        {/* Button to Admin Panel */}
        <button
          onClick={navigateToAdminPanel}
          className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-lg"
        >
          Admin Panel
        </button>

        {/* Button to Customer Bug Tracking */}
        <button
          onClick={navigateToCustomerBugTracking}
          className="bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition duration-200 shadow-lg"
        >
          Bug Tracking System
        </button>

        {/* Button to Expert Panel */}
        <button
          onClick={navigateToExpertPanel}
          className="bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition duration-200 shadow-lg"
        >
          Expert Panel
        </button>
      </div>
    </div>
  );
}
