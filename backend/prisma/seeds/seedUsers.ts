import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
// prisma/seeds/seedUsers.ts

dotenv.config(); // โหลดค่าจาก .env ไฟล์

export async function seedUsers(prisma: PrismaClient) {
  // รับค่า SALT_ROUNDS จาก .env หรือใช้ค่า default ถ้าหาไม่เจอ
  const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);

  // รับ prisma instance เป็น argument
  // ตรวจสอบว่ามี admin user (id = 1) หรือยัง ถ้าไม่มีให้สร้าง
  const adminUser = await prisma.user.findUnique({ where: { id: 1 } })
  if (!adminUser) {
    console.log('Creating default admin user...')
    const adminPassword = await bcrypt.hash('P@ssw0rd2025!', saltRounds) // Hash password ของ admin
    await prisma.user.create({
      data: {
        displayName: 'Administrator',
        username: 'admin',
        email: 'admin@example.com',
        password: adminPassword,
        isActive: true,
      },
    })
    console.log('Admin user created.')
  }

  const users = [
    {
      email: 'test@example.com',
      displayName: 'Test User',
      username: 'testuser',
      password: await bcrypt.hash('P@ssw0rd2025!', saltRounds),
      createdBy: 1,
    },
    {
      email: 'test2@example.com',
      displayName: 'Test User 2',
      username: 'testuser2',
      password: await bcrypt.hash('P@ssw0rd2025!', saltRounds),
      createdBy: 1,
    },
  ]

  const createdUsers = [] // สร้าง array เพื่อเก็บ users ที่สร้าง

  for (const userData of users) {
    try {
      const user = await prisma.user.upsert({
        where: { email: userData.email },
        update: {},
        create: userData,
      })
      console.log(`User "${userData.email}" seeded successfully.`)
      createdUsers.push(user) // เพิ่ม user ที่สร้างลงใน array
    } catch (error) {
      console.error(`Error seeding user "${userData.email}":`, error)
    }
  }
  console.log('Users seeding complete.')
  return createdUsers // return array ของ users ที่สร้าง
}
