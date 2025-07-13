import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { prisma } from "../../../../../lib/prisma";

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

    // Delete old notice.jpg file if it exists
    const oldFilepath = path.join(process.cwd(), "public", "notice.jpg");

    if (existsSync(oldFilepath)) {
      try {
        await unlink(oldFilepath);
        console.log("Deleted old notice.jpg");
      } catch (deleteError) {
        console.error("Error deleting old image:", deleteError);
        // Continue with upload even if deletion fails
      }
    }

    // Use fixed filename
    const filename = "notice.jpg";
    const filepath = path.join(process.cwd(), "public", filename);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Update database with the new image URL
    const imageUrl = `/notice.jpg`;
    await prisma.settings.update({
      where: { id: "global" },
      data: { noticeImageUrl: imageUrl, isNoticeActive: true },
    });

    // Return success response with file info
    return NextResponse.json({
      message: "Image uploaded successfully",
      filename,
      originalName: file.name,
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
