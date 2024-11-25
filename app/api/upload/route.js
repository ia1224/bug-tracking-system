import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded!" }, { status: 400 });
    }

    let fileContent = "";
    try {
      fileContent = await file.text(); // Read the file's text content
    } catch (error) {
      return NextResponse.json(
        { error: "Error reading file content." },
        { status: 500 }
      );
    }

    let errorOutput = "";
    const errors = [];
    const lines = fileContent.split("\n"); // Split content into lines

    // Error checks (same as your previous checks)
    if (!fileContent.includes("int main(")) {
      errors.push("Error: No main() function detected.");
    }

    lines.forEach((line, index) => {
      if (
        line.match(/\b[a-zA-Z_]\w*\s*=\s*/g) &&
        !line.match(/\bint\b|\bfloat\b|\bchar\b/)
      ) {
        errors.push(
          `Error: Possible undeclared variable at line ${
            index + 1
          }: ${line.trim()}`
        );
      }
    });

    lines.forEach((line, index) => {
      if (
        !line.trim().endsWith(";") &&
        line.trim().match(/[^{}]\s*\w+\s*[=|+|-|*|\/]/)
      ) {
        errors.push(
          `Error: Missing semicolon at line ${index + 1}: ${line.trim()}`
        );
      }
    });

    const openBraces = (fileContent.match(/{/g) || []).length;
    const closeBraces = (fileContent.match(/}/g) || []).length;
    if (openBraces !== closeBraces) {
      errors.push("Error: Mismatched curly braces found.");
    }

    lines.forEach((line, index) => {
      if (
        line.includes("return") &&
        index + 1 < lines.length &&
        lines[index + 1].trim() !== ""
      ) {
        errors.push(
          `Error: Unreachable code detected after return statement at line ${
            index + 1
          }: ${lines[index + 1].trim()}`
        );
      }
    });

    // Additional error checks omitted for brevity but you can keep your original checks

    let fullCodeWithLineNumbers = lines
      .map((line, index) => `${String(index + 1).padStart(3, " ")}: ${line}`)
      .join("\n");

    if (errors.length > 0) {
      errorOutput = `Errors found:\n${errors.join(
        "\n"
      )}\n\nFull Code:\n${fullCodeWithLineNumbers}`;
    } else {
      errorOutput = `No errors found in the uploaded code!\n\nFull Code:\n${fullCodeWithLineNumbers}`;
    }

    // Step 1: Define the file path to store file metadata
    const uploadsPath = path.join(process.cwd(), "uploads.json");

    // Step 2: Read the current uploads.json file if it exists
    let uploads = [];
    if (fs.existsSync(uploadsPath)) {
      uploads = JSON.parse(fs.readFileSync(uploadsPath, "utf8"));
    }

    // Step 3: Append the new file's metadata and error output
    const newFileEntry = {
      fileName: file.name, // Add the filename
      errorReport: errorOutput, // Store the error report or successful checks
      timestamp: new Date().toISOString(), // Optional: Store upload time
    };

    uploads.push(newFileEntry);

    // Step 4: Write the updated uploads array back to uploads.json
    fs.writeFileSync(uploadsPath, JSON.stringify(uploads, null, 2));

    return NextResponse.json({ message: errorOutput });
  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected error occurred while processing the file." },
      { status: 500 }
    );
  }
}
