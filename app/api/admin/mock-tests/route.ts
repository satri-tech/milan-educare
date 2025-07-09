import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/mock-tests - Get all mock tests
export async function GET() {
  try {
    // Get paginated results without any filters
    const mockTests = await prisma.mockTest.findMany({
      orderBy: {
        title: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: mockTests,
    });
  } catch (error) {
    console.error("Error fetching mock tests:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch mock tests" },
      { status: 500 }
    );
  }
}

// POST /api/mock-tests - Create a new mock test
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    const { title, subject, duration, questions, description, link } = body;

    if (!title || !subject || !duration || !questions || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (typeof questions !== "number" || questions <= 0) {
      return NextResponse.json(
        { success: false, error: "Questions must be a positive number" },
        { status: 400 }
      );
    }

    // Create new mock test
    const newMockTest = await prisma.mockTest.create({
      data: {
        title,
        subject,
        duration,
        questions,
        description,
        link,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: newMockTest,
        message: "Mock test created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating mock test:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create mock test" },
      { status: 500 }
    );
  }
}
