import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { promises as fs } from "fs";
import path from "path";
import { DashboardStats } from "@/types/dashboard";

async function getDirectorySize(dirPath: string): Promise<number> {
  try {
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    let totalSize = 0;

    for (const file of files) {
      const filePath = path.join(dirPath, file.name);
      if (file.isDirectory()) {
        totalSize += await getDirectorySize(filePath);
      } else {
        const stats = await fs.stat(filePath);
        totalSize += stats.size;
      }
    }

    return totalSize;
  } catch (error) {
    console.error(`Error calculating directory size for ${dirPath}:`, error);
    return 0;
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get counts from database
    const [
      totalPdfs,
      totalContacts,
      totalTestimonials,
      totalMockTests,
      totalNebNotes,
    ] = await Promise.all([
      prisma.pdf.count(),
      prisma.contactUs.count(),
      prisma.testimonial.count(),
      prisma.mockTest.count(),
      prisma.topic.count(), // Assuming NEB Notes are represented by topics
    ]);

    // Calculate storage usage
    const publicPath = path.join(process.cwd(), "public");
    const pdfsPath = path.join(publicPath, "pdfs");
    const testimonialsPath = path.join(publicPath, "testimonials");

    const [pdfsSize, testimonialsSize] = await Promise.all([
      getDirectorySize(pdfsPath),
      getDirectorySize(testimonialsPath),
    ]);

    const totalStorageUsed = pdfsSize + testimonialsSize;

    const stats: DashboardStats = {
      totalPdfs,
      totalContacts,
      totalTestimonials,
      totalMockTests,
      totalNebNotes,
      storageUsed: {
        pdfs: {
          bytes: pdfsSize,
          formatted: formatBytes(pdfsSize),
        },
        testimonials: {
          bytes: testimonialsSize,
          formatted: formatBytes(testimonialsSize),
        },
        total: {
          bytes: totalStorageUsed,
          formatted: formatBytes(totalStorageUsed),
        },
      },
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics" },
      { status: 500 }
    );
  }
}
