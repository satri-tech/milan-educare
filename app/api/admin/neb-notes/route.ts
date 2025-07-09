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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    for (const [gradeName, subjectData] of Object.entries(body)) {
      // Upsert Grade
      const grade = await prisma.grade.upsert({
        where: { name: gradeName },
        update: {},
        create: { name: gradeName },
      });

      for (const [subjectName, topics] of Object.entries(subjectData as any)) {
        // Upsert Subject
        const subject = await prisma.subject.upsert({
          where: {
            name_gradeId: {
              name: subjectName,
              gradeId: grade.id,
            },
          },
          update: {},
          create: {
            name: subjectName,
            gradeId: grade.id,
          },
        });

        for (const topic of topics as any[]) {
          // Upsert Topic
          const topicRecord = await prisma.topic.upsert({
            where: {
              title_subjectId: {
                title: topic.title,
                subjectId: subject.id,
              },
            },
            update: {},
            create: {
              title: topic.title,
              subjectId: subject.id,
            },
          });

          // Delete existing PDFs to avoid duplicates
          await prisma.pdf.deleteMany({
            where: { topicId: topicRecord.id },
          });

          // Insert new PDFs
          await prisma.pdf.createMany({
            data: topic.pdfs.map((pdf: any) => ({
              name: pdf.name,
              url: pdf.url,
              topicId: topicRecord.id,
            })),
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "NEB data saved successfully.",
    });
  } catch (error) {
    console.error("Failed to store NEB data:", error);
    return NextResponse.json(
      { error: "Failed to store data" },
      { status: 500 }
    );
  }
}
