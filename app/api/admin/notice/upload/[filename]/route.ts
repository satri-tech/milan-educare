// app/api/images/[filename]/route.ts

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// Helper function to get content type based on file extension
function getContentType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();

  const contentTypes: { [key: string]: string } = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".bmp": "image/bmp",
    ".tiff": "image/tiff",
    ".tif": "image/tiff",
  };

  return contentTypes[ext] || "image/jpeg";
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // Prevent directory traversal attacks
  if (!filename || filename.includes("..")) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  // Validate file extension (only allow image files)
  const allowedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".svg",
    ".ico",
    ".bmp",
    ".tiff",
    ".tif",
  ];
  const fileExtension = path.extname(filename).toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    return NextResponse.json(
      { error: "Invalid image file type" },
      { status: 400 }
    );
  }

  const filePath = path.join(process.cwd(), "public", "notice", filename);

  try {
    await fs.promises.access(filePath); // check if file exists
    const fileBuffer = await fs.promises.readFile(filePath);
    const contentType = getContentType(filename);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch {
    return new Response("Image not found", { status: 404 });
  }
}
