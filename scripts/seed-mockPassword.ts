// import 'dotenv/config';
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
// No need for advanced mapping techniques, while loop will create admin users sequentially, as we do not need more than 5 admins for a simple landing page
async function seedAdmin() {
  try {
    console.log("🌱 Seeding mocktest password to root...");

    await prisma.settings.upsert({
      where: { id: "global" },
      update: {},
      create: {
        id: "global",
        mockTestPassword: "root", // Default password
      },
    });
  } catch (error) {
    console.error("❌ Error seeding mockPassword:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
