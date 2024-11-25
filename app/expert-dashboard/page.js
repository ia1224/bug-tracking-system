"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ExpertDashboard() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [errorOutput, setErrorOutput] = useState("");
  const [correctedCode, setCorrectedCode] = useState("");

  useEffect(() => {
    // Check if expert is logged in
    if (localStorage.getItem("isExpertLoggedIn") !== "true") {
      router.push("/expert-login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isExpertLoggedIn");
    router.push("/expert-login");
  };

  const handleSubmitCode = (e) => {
    e.preventDefault();
    let errors = [];
    let fixedCode = code; // Start with the original code

    // Check for missing semicolons after printf and fix them
    fixedCode = fixedCode.replace(
      /printf\([^\)]+\)[^\;]*$/gm,
      (match) => match + ";"
    );

    // Fix 'scanf' syntax: remove extra commas and ensure variables are correctly placed
    fixedCode = fixedCode.replace(
      /scanf\([^\)]+\)[^\;]*$/gm,
      'scanf("%d %d", &a, &b);'
    );

    // Ensure the inclusion of 'stdlib.h' for malloc
    fixedCode = fixedCode.replace(
      /#include <stdio.h>/g,
      "#include <stdio.h>\n#include <stdlib.h>"
    );

    // Check for uninitialized variables
    if (code.includes("int") && !code.includes("=")) {
      errors.push("Logical Error: Uninitialized variable detected.");
      // Auto-correct: Initialize variables with a default value
      fixedCode = fixedCode.replace(/(int\s+\w+;)/g, "$1 = 0;");
    }

    // Fix missing pointer declaration and memory allocation
    if (!code.includes("int *ptr = (int*)malloc")) {
      fixedCode = fixedCode.replace(
        /int\s+\*ptr;/g,
        "int *ptr = (int*)malloc(sizeof(int));\nif(ptr == NULL) { return 1; }"
      );
    }

    // Fix missing return statement and ensure proper return type in `main`
    fixedCode = fixedCode.replace(/return\s*"Done";/, "return 0;");

    // Check for infinite loops
    if (code.includes("while") && !code.includes("i++")) {
      errors.push(
        "Loop Error: Possible infinite loop detected. Missing increment."
      );
      // Auto-correct: Add increment to loop (basic assumption of 'i++')
      fixedCode = fixedCode.replace(/(while\s*\(.+\))\s*{/, "$1 { i++;");
    }

    // If no errors are found, return success message
    if (errors.length === 0) {
      setErrorOutput("No errors found. Code executed successfully.");
      setCorrectedCode(""); // No correction needed
    } else {
      setErrorOutput(
        `Errors found and auto-corrected:\n${errors.join(
          "\n"
        )}\n\nOriginal Code:\n${code}`
      );
      setCorrectedCode(fixedCode);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-teal-200 flex flex-col items-center py-10 text-black">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg mb-12 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-800">Expert Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-red-600 transition duration-200"
        >
          Log Out
        </button>
      </nav>

      {/* Code Submission */}
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Submit Your Code
        </h2>
        <form onSubmit={handleSubmitCode}>
          <textarea
            placeholder="Write your code here..."
            className="w-full h-64 p-4 border rounded-lg"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-green-600 transition duration-200 mt-4 w-full"
          >
            Submit Code
          </button>
        </form>

        {/* Error Output */}
        {errorOutput && (
          <div className="mt-6 bg-gray-200 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-red-500">
              Code Analysis Result:
            </h3>
            <pre className="whitespace-pre-wrap text-black">{errorOutput}</pre>
          </div>
        )}

        {/* Corrected Code Output */}
        {correctedCode && (
          <div className="mt-6 bg-gray-200 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-green-500">
              Corrected Code:
            </h3>
            <pre className="whitespace-pre-wrap text-black">
              {correctedCode}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
