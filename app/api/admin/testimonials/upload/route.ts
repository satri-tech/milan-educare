import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, and WebP are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size too large. Maximum 5MB allowed." },
        { status: 400 }
      );
    }

    // Generate a shorter, hyphen-free filename (e.g., "testimonial_abc123xyz.jpg")
    const fileExtension = path.extname(file.name);
    const uniqueId = uuidv4().replace(/-/g, ""); // Remove all hyphens
    const shortId = uniqueId.slice(0, 8); // Take first 8 chars for brevity
    const fileName = `testimonial_${shortId}${fileExtension}`; // Using underscore instead of hyphen

    // Create upload path
    const uploadDir = path.join(process.cwd(), "public");
    const filePath = path.join(uploadDir, fileName);

    // Create directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Convert file to buffer and write to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    // Return the public URL
    const publicUrl = `/${fileName}`;

    return NextResponse.json({
      message: "File uploaded successfully",
      url: publicUrl,
      filename: fileName,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
