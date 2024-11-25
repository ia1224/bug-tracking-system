import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  const uploadsDir = path.join(process.cwd(), "/uploads");

  try {
    const files = fs.readdirSync(uploadsDir);
    return NextResponse.json({ files });
  } catch (error) {
    console.error("Error reading uploads directory:", error);
    return NextResponse.json(
      { error: "Failed to retrieve files" },
      { status: 500 }
    );
  }
}
