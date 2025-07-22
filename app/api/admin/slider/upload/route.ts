import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;
    const altText = formData.get("altText") as string;
    const order = formData.get("order") as string;

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

    // Validate file size (10MB limit for slider images)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size too large. Maximum 10MB allowed." },
        { status: 400 }
      );
    }

    // Generate a unique filename
    const fileExtension = path.extname(file.name);
    const uniqueId = uuidv4().replace(/-/g, ""); // Remove all hyphens
    const shortId = uniqueId.slice(0, 8); // Take first 8 chars for brevity
    const fileName = `slider_${shortId}${fileExtension}`;

    // Create upload path
    const uploadDir = path.join(process.cwd(), "public", "slides");
    const filePath = path.join(uploadDir, fileName);

    // Create directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Convert file to buffer and write to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    // Get the next order number if not provided
    let orderNumber = parseInt(order) || 0;
    if (!order) {
      const lastImage = await prisma.sliderImage.findFirst({
        orderBy: { order: "desc" },
      });
      orderNumber = (lastImage?.order || 0) + 1;
    }

    // Save to database
    const sliderImage = await prisma.sliderImage.create({
      data: {
        name: fileName,
        url: `${fileName}`,
        altText: altText || null,
        order: orderNumber,
      },
    });

    return NextResponse.json({
      message: "Slider image uploaded successfully",
      sliderImage,
    });
  } catch (error) {
    console.error("Error uploading slider image:", error);
    return NextResponse.json(
      { error: "Failed to upload slider image" },
      { status: 500 }
    );
  }
}
