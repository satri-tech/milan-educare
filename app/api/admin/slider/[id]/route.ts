import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// Update a specific slider image
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated", success: false },
        { status: 401 }
      );
    }
    const { id } = await params;
    const { altText, order } = await request.json();

    // Check if slider image exists
    const existingImage = await prisma.sliderImage.findUnique({
      where: { id },
    });

    if (!existingImage) {
      return NextResponse.json(
        { error: "Slider image not found" },
        { status: 404 }
      );
    }

    // Update the slider image
    const updatedSliderImage = await prisma.sliderImage.update({
      where: { id },
      data: {
        ...(altText !== undefined && { altText }),
        ...(order !== undefined && { order: parseInt(order) }),
      },
    });

    return NextResponse.json({
      message: "Slider image updated successfully",
      sliderImage: updatedSliderImage,
    });
  } catch (error) {
    console.error("Error updating slider image:", error);
    return NextResponse.json(
      { error: "Failed to update slider image" },
      { status: 500 }
    );
  }
}

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
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Prevent directory traversal attacks
  if (!id || id.includes("..")) {
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
  const fileExtension = path.extname(id).toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    return NextResponse.json(
      { error: "Invalid image file type" },
      { status: 400 }
    );
  }

  const filePath = path.join(process.cwd(), "public", "slides", id);

  try {
    await fs.promises.access(filePath); // check if file exists
    const fileBuffer = await fs.promises.readFile(filePath);
    const contentType = getContentType(id);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${id}"`,
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch {
    return new Response("Image not found", { status: 404 });
  }
}
