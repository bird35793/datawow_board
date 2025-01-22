// prisma/seeds/index.ts
import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seedUsers';
import { seedPosts } from './seedPosts';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  const users = await seedUsers(prisma); // เรียก seedUsers และรับ users ที่สร้าง
  if (users && users.length > 0) { // ตรวจสอบว่ามี users ถูกสร้างหรือไม่
    const seeds = [
      { name: 'posts', seedFunction: () => seedPosts(users, prisma) }, // ส่ง users และ prisma ไปยัง seedPosts
    ];

    for (const { name, seedFunction } of seeds) {
      const seedHistory = await prisma.seedHistory.findUnique({
        where: { name },
      });

      if (!seedHistory) {
        await seedFunction();
        await prisma.seedHistory.create({
          data: { name },
        });
        console.log(`Seeded ${name}`);
      } else {
        console.log(`Skipping ${name}, already seeded.`);
      }
    }
  } else {
    console.log("No users were created, skipping post seeding.");
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });