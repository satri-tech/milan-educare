import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// DELETE - Delete a subject
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ subjectId: string }> }
) {
  try {
    const { subjectId } = await params;
    
    if (!subjectId) {
      return NextResponse.json(
        { error: "Subject ID is required" },
        { status: 400 }
      );
    }

    // Check if subject exists
    const existingSubject = await prisma.subject.findUnique({
      where: { id: subjectId }
    });

    if (!existingSubject) {
      return NextResponse.json(
        { error: "Subject not found" },
        { status: 404 }
      );
    }

    // Delete subject (topics and PDFs will be cascade deleted)
    await prisma.subject.delete({
      where: { id: subjectId }
    });

    return NextResponse.json({
      success: true,
      message: "Subject deleted successfully"
    });
  } catch (error) {
    console.error("Failed to delete subject:", error);
    return NextResponse.json(
      { error: "Failed to delete subject" },
      { status: 500 }
    );
  }
}

// POST - Create a new topic for the subject
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ subjectId: string }> }
) {
  try {
    const { subjectId } = await params;
    const body = await request.json();

    if (!subjectId) {
      return NextResponse.json(
        { error: "Subject ID is required" },
        { status: 400 }
      );
    }

    if (!body.title || typeof body.title !== "string") {
      return NextResponse.json(
        { error: 'Topic title is required' },
        { status: 400 }
      );
    }

    // Check if subject exists
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId }
    });

    if (!subject) {
      return NextResponse.json(
        { error: "Subject not found" },
        { status: 404 }
      );
    }

    // Check if topic already exists for this subject
    const existingTopic = await prisma.topic.findFirst({
      where: {
        title: body.title,
        subjectId: subjectId
      }
    });

    if (existingTopic) {
      return NextResponse.json(
        { error: `Topic "${body.title}" already exists for this subject` },
        { status: 409 }
      );
    }

    // Create new topic
    const newTopic = await prisma.topic.create({
      data: {
        title: body.title,
        subjectId: subjectId
      }
    });

    return NextResponse.json({
      success: true,
      message: "Topic added successfully",
      data: newTopic
    });
  } catch (error) {
    console.error("Failed to create topic:", error);
    return NextResponse.json(
      { error: "Failed to create topic" },
      { status: 500 }
    );
  }
}
