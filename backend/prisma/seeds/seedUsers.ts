// prisma/seeds/seedUsers.ts
import { PrismaClient } from '@prisma/client';

export async function seedUsers(prisma: PrismaClient) { // รับ prisma instance เป็น argument
  const users = [
    { email: 'test@example.com', displayName: 'Test User', username: 'testuser' },
    { email: 'test2@example.com', displayName: 'Test User 2', username: 'testuser2' },
  ];

  const createdUsers = []; // สร้าง array เพื่อเก็บ users ที่สร้าง

  for (const userData of users) {
    try {
      const user = await prisma.user.upsert({
        where: { email: userData.email },
        update: {},
        create: userData,
      });
      console.log(`User "${userData.email}" seeded successfully.`);
      createdUsers.push(user); // เพิ่ม user ที่สร้างลงใน array
    } catch (error) {
      console.error(`Error seeding user "${userData.email}":`, error);
    }
  }
  console.log('Users seeding complete.');
  return createdUsers; // return array ของ users ที่สร้าง
}