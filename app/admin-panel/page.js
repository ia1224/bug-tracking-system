// app/admin-panel/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPanel() {
  const router = useRouter();
  const [files, setFiles] = useState([]);

  // Dummy data for now. You can replace this with an API call to get actual submitted files.
  const fetchFiles = () => {
    return [
      { id: 1, fileName: "error_code_sample.c" },
      { id: 2, fileName: "file2.c" },
      { id: 3, fileName: "project.c" },
    ];
  };

  useEffect(() => {
    // Check if admin is logged in
    if (localStorage.getItem("isAdminLoggedIn") !== "true") {
      router.push("/admin-login");
    } else {
      setFiles(fetchFiles()); // Fetch files once admin is logged in
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    router.push("/admin-login");
  };

  const expertNames = [
    "Om Pratap Singh",
    "Isha Anshika",
    "Achuyt Yadav",
    "Bhavya Rajpal",
  ];

  const handleSubmit = () => {
    alert("Submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center py-10 text-black">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg mb-12 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-red-600 transition duration-200"
        >
          Log Out
        </button>
      </nav>

      {/* File List */}
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Submitted Files
        </h2>
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Serial Number</th>
              <th className="px-4 py-2">File Name</th>
              <th className="px-4 py-2">Expert</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={file.id} className="text-center text-black">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{file.fileName}</td>
                {/* Expert Dropdown */}
                <td className="border px-4 py-2">
                  <select className="border p-2 rounded">
                    {expertNames.map((expert, idx) => (
                      <option key={idx} value={expert}>
                        {expert}
                      </option>
                    ))}
                  </select>
                </td>
                {/* Submit Button */}
                <td className="border px-4 py-2">
                  <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-green-600 transition duration-200"
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
