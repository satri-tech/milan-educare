// @ts-nocheck

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// get the data on the format the frontend needs
export async function GET() {
  try {
    const grades = await prisma.grade.findMany({
      include: {
        subjects: {
          include: {
            topics: {
              include: {
                pdfs: true,
              },
            },
          },
        },
      },
      orderBy: { id: "asc" },
    });

    const nebData: Record<string, any> = {};

    for (const grade of grades) {
      const gradeName = grade.name;
      if (!nebData[gradeName]) {
        nebData[gradeName] = { subjects: {} };
      }

      for (const subject of grade.subjects) {
        if (!nebData[gradeName].subjects[subject.name]) {
          nebData[gradeName].subjects[subject.name] = [];
        }

        for (const topic of subject.topics) {
          nebData[gradeName].subjects[subject.name].push({
            title: topic.title,
            pdfs: topic.pdfs.map((pdf) => ({
              name: pdf.name,
              url: pdf.url,
            })),
          });
        }
      }
    }

    return NextResponse.json(nebData);
  } catch (error) {
    console.error("Error fetching NEB data:", error);
    return NextResponse.json(
      { error: "Failed to load NEB data" },
      { status: 500 }
    );
  }
}
