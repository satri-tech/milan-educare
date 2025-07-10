import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ gradeId: string }> }
) {
  try {
    const { gradeId } = await params;
    if (!gradeId) {
      return NextResponse.json(
        { message: "Please provide the gradeId to delete" },
        { status: 400 }
      );
    }
    // Check if mock test exists
    const existingMockTest = await prisma.grade.findUnique({
      where: { id: gradeId },
    });

    if (!existingMockTest) {
      return NextResponse.json(
        { success: false, error: "Grade not found" },
        { status: 404 }
      );
    }

    await prisma.grade.delete({ where: { id: gradeId } });
    return NextResponse.json(
      { message: "Grade deleted succesfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
