import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch all subjects, topics, and PDFs for a specific grade
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ gradeId: string }> }
) {
  try {
    const { gradeId } = await params;
    
    if (!gradeId) {
      return NextResponse.json(
        { error: "Grade ID is required" },
        { status: 400 }
      );
    }

    // Fetch grade with all nested data
    const grade = await prisma.grade.findUnique({
      where: { id: gradeId },
      include: {
        subjects: {
          include: {
            topics: {
              include: {
                pdfs: true
              }
            }
          }
        }
      }
    });

    if (!grade) {
      return NextResponse.json(
        { error: "Grade not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: grade
    });
  } catch (error) {
    console.error("Failed to fetch grade data:", error);
    return NextResponse.json(
      { error: "Failed to fetch grade data" },
      { status: 500 }
    );
  }
}

// POST - Create a new subject for the grade
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ gradeId: string }> }
) {
  try {
    const { gradeId } = await params;
    const body = await request.json();

    if (!gradeId) {
      return NextResponse.json(
        { error: "Grade ID is required" },
        { status: 400 }
      );
    }

    if (!body.name || typeof body.name !== "string") {
      return NextResponse.json(
        { error: 'Subject name is required' },
        { status: 400 }
      );
    }

    // Check if grade exists
    const grade = await prisma.grade.findUnique({
      where: { id: gradeId }
    });

    if (!grade) {
      return NextResponse.json(
        { error: "Grade not found" },
        { status: 404 }
      );
    }

    // Check if subject already exists for this grade
    const existingSubject = await prisma.subject.findFirst({
      where: {
        name: body.name,
        gradeId: gradeId
      }
    });

    if (existingSubject) {
      return NextResponse.json(
        { error: `Subject "${body.name}" already exists for this grade` },
        { status: 409 }
      );
    }

    // Create new subject
    const newSubject = await prisma.subject.create({
      data: {
        name: body.name,
        gradeId: gradeId
      }
    });

    return NextResponse.json({
      success: true,
      message: "Subject added successfully",
      data: newSubject
    });
  } catch (error) {
    console.error("Failed to create subject:", error);
    return NextResponse.json(
      { error: "Failed to create subject" },
      { status: 500 }
    );
  }
}
