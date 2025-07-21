import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("noticeImage") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.includes("image")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Sanitize filename (remove special characters, keep only alphanumeric, dots, and dashes)
    const originalFilename = file.name;
    const sanitizedFilename = originalFilename.replace(/[^a-zA-Z0-9-_.]/g, "");

    // Create notice directory if it doesn't exist
    const noticeDir = path.join(process.cwd(), "public", "notice");
    if (!existsSync(noticeDir)) {
      await mkdir(noticeDir, { recursive: true });
    }

    // Delete old file if it exists (with the same name)
    const oldFilepath = path.join(noticeDir, sanitizedFilename);
    if (existsSync(oldFilepath)) {
      try {
        await unlink(oldFilepath);
        console.log(`Deleted old ${sanitizedFilename}`);
      } catch (deleteError) {
        console.error("Error deleting old image:", deleteError);
        // Continue with upload even if deletion fails
      }
    }

    // Save new file
    const filepath = path.join(noticeDir, sanitizedFilename);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Update database with the new image URL
    const imageUrl = `${sanitizedFilename}`;
    await prisma.settings.update({
      where: { id: "global" },
      data: { noticeImageUrl: imageUrl, isNoticeActive: true },
    });

    // Return success response with file info
    return NextResponse.json({
      message: "Image uploaded successfully",
      filename: sanitizedFilename,
      originalName: originalFilename,
      size: file.size,
      url: imageUrl,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
