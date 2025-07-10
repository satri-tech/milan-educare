import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET - Fetch all grades
export async function GET() {
  try {
    const grades = await prisma.grade.findMany({
      orderBy: {
        name: "asc", // Optional: Sort grades alphabetically
      },
    });

    return NextResponse.json({
      success: true,
      data: grades,
    });
  } catch (error) {
    console.error("Failed to fetch grades:", error);
    return NextResponse.json(
      { error: "Failed to fetch grades" },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate the request body format
    if (!body.grade || typeof body.grade !== "string") {
      return NextResponse.json(
        { error: 'Invalid format. Expected { "grade": "Grade Name" }' },
        { status: 400 }
      );
    }

    const gradeName = body.grade;

    // Check if the grade already exists
    const existingGrade = await prisma.grade.findUnique({
      where: { name: gradeName },
    });

    if (existingGrade) {
      return NextResponse.json(
        { error: `Grade "${gradeName}" already exists.` },
        { status: 409 } // HTTP 409 Conflict
      );
    }

    // If grade doesn't exist, create it
    const newGrade = await prisma.grade.create({
      data: { name: gradeName },
    });

    return NextResponse.json({
      success: true,
      message: "Grade added successfully.",
      data: newGrade,
    });
  } catch (error) {
    console.error("Failed to store grade:", error);
    return NextResponse.json(
      { error: "Failed to store grade" },
      { status: 500 }
    );
  }
}
