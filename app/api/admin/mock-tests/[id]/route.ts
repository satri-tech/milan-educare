// app/api/mock-tests/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/mock-tests/[id] - Get a specific mock test
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const mockTest = await prisma.mockTest.findUnique({
      where: { id },
    });

    if (!mockTest) {
      return NextResponse.json(
        { success: false, error: "Mock test not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: mockTest,
    });
  } catch (error) {
    console.error("Error fetching mock test:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch mock test" },
      { status: 500 }
    );
  }
}

// PUT /api/mock-tests/[id] - Update a mock test
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validation
    const { title, subject, duration, questions, description } = body;

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

    // Check if mock test exists
    const existingMockTest = await prisma.mockTest.findUnique({
      where: { id },
    });

    if (!existingMockTest) {
      return NextResponse.json(
        { success: false, error: "Mock test not found" },
        { status: 404 }
      );
    }

    // Update mock test
    const updatedMockTest = await prisma.mockTest.update({
      where: { id },
      data: {
        title,
        subject,
        duration,
        questions,
        description,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedMockTest,
      message: "Mock test updated successfully",
    });
  } catch (error) {
    console.error("Error updating mock test:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update mock test" },
      { status: 500 }
    );
  }
}

// DELETE /api/mock-tests/[id] - Delete a mock test
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if mock test exists
    const existingMockTest = await prisma.mockTest.findUnique({
      where: { id },
    });

    if (!existingMockTest) {
      return NextResponse.json(
        { success: false, error: "Mock test not found" },
        { status: 404 }
      );
    }

    // Delete mock test
    await prisma.mockTest.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Mock test deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting mock test:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete mock test" },
      { status: 500 }
    );
  }
}
