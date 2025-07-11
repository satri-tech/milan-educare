// app/api/files/[filename]/route.ts

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // Prevent directory traversal attacks
  if (!filename || filename.includes("..")) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "public", "pdfs", filename);

  try {
    await fs.promises.access(filePath); // check if file exists
    const fileBuffer = await fs.promises.readFile(filePath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    });

    // return NextResponse.json({ message: filePath });
  } catch  {
    return new Response("File not found", { status: 404 });
  }
}
