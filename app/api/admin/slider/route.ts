import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";

// Get all slider images
export async function GET() {
  try {
    const sliderImages = await prisma.sliderImage.findMany({
      orderBy: {
        order: "asc",
      },
    });
    
    return NextResponse.json(sliderImages, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // Cache for 5 minutes, allow stale for 10 minutes
        'CDN-Cache-Control': 'public, s-maxage=300',
        'Vary': 'Accept-Encoding',
      },
    });
  } catch (error) {
    console.error("Error fetching slider images:", error);
    return NextResponse.json(
      { error: "Failed to fetch slider images" },
      { status: 500 }
    );
  }
}

// Delete a slider image
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Missing ID field" }, { status: 400 });
    }

    // Get the slider image to find the file name
    const sliderImage = await prisma.sliderImage.findUnique({
      where: { id },
    });

    if (!sliderImage) {
      return NextResponse.json(
        { error: "Slider image not found" },
        { status: 404 }
      );
    }

    // Delete the file from the filesystem
    try {
      const filePath = path.join(
        process.cwd(),
        "public",
        "slides",
        sliderImage.name
      );
      await unlink(filePath);
    } catch (fileError) {
      console.warn("Could not delete file from filesystem:", fileError);
      // Continue with database deletion even if file deletion fails
    }

    // Delete from database
    await prisma.sliderImage.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Slider image deleted successfully" });
  } catch (error) {
    console.error("Error deleting slider image:", error);
    return NextResponse.json(
      { error: "Failed to delete slider image" },
      { status: 500 }
    );
  }
}
