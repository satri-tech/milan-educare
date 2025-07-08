// app/api/mock-tests/stats/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/mock-tests/stats - Get mock test statistics
export async function GET() {
  try {
    // Get total count
    const totalTests = await prisma.mockTest.count();

    // Get total questions
    const totalQuestionsResult = await prisma.mockTest.aggregate({
      _sum: {
        questions: true,
      },
    });

    // Get subjects distribution
    const subjectsDistribution = await prisma.mockTest.groupBy({
      by: ["subject"],
      _count: {
        subject: true,
      },
      orderBy: {
        _count: {
          subject: "desc",
        },
      },
    });

    // Calculate average duration (this is a simplified calculation)
    const allTests = await prisma.mockTest.findMany({
      select: {
        duration: true,
      },
    });

    // Convert duration strings to minutes for calculation
    const durationInMinutes = allTests.map((test) => {
      const duration = test.duration.toLowerCase();
      if (duration.includes("hour")) {
        const hours = parseFloat(duration.match(/[\d.]+/)?.[0] || "0");
        return hours * 60;
      }
      if (duration.includes("minute")) {
        return parseFloat(duration.match(/\d+/)?.[0] || "0");
      }
      return 0;
    });

    const avgDurationMinutes =
      durationInMinutes.length > 0
        ? durationInMinutes.reduce((a, b) => a + b, 0) /
          durationInMinutes.length
        : 0;

    const avgDurationHours = Math.round((avgDurationMinutes / 60) * 10) / 10;

    return NextResponse.json({
      success: true,
      data: {
        totalTests,
        totalQuestions: totalQuestionsResult._sum.questions || 0,
        avgDuration: `${avgDurationHours} hours`,
        subjectsDistribution: subjectsDistribution.map((item) => ({
          subject: item.subject,
          count: item._count.subject,
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching mock test stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
