"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [errorResult, setErrorResult] = useState("");
  const [file, setFile] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setErrorResult("No file selected");
      return;
    }

    // Form data to send file
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Send file to the API route for processing
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const result = await response.json();
      // Set errorResult to display the message from the backend
      setErrorResult(result.message);
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorResult("An error occurred while uploading the file.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center py-10">
      <nav className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg mb-12 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-800">
          Bug Tracking Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-red-600 transition duration-200"
        >
          Log Out
        </button>
      </nav>

      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Submit Your Code
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700">
              File Upload
            </label>
            <input
              type="file"
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-150 text-black"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
          >
            Submit
          </button>
        </form>
      </div>

      {errorResult && (
        <div className="bg-white p-8 mt-10 rounded-lg shadow-lg max-w-2xl w-full transition duration-300 transform hover:scale-105">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Code Analysis Result:
          </h3>
          <pre className="bg-gray-100 p-6 rounded-lg overflow-x-auto whitespace-pre-wrap text-sm text-red-600 font-mono">
            {errorResult}
          </pre>
        </div>
      )}
    </div>
  );
}
