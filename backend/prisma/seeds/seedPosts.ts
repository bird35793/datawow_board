import { PrismaClient } from '@prisma/client';

export async function seedPosts(users: { id: number }[], prisma: PrismaClient) {
  const posts = [
    {
      title: 'คำถามแรก',
      content: 'เนื้อหาของคำถามแรก',
      authorId: users[0].id,
      createdBy: users[0].id,
    },
    {
      title: 'คำถามที่สอง',
      content: 'เนื้อหาของคำถามที่สอง',
      authorId: users[1].id,
      createdBy: users[1].id,
    },
  ];

  for (const postData of posts) {
    try {
      await prisma.post.upsert({
        where: { title: postData.title }, // ใช้ title อย่างเดียวเพราะเป็น unique
        update: { content: postData.content, authorId: postData.authorId }, // อัปเดต content และ authorId ในกรณีที่มี post อยู่แล้ว
        create: postData,
      });
      console.log(`Post "${postData.title}" seeded successfully.`);
    } catch (error) {
      console.error(`Error seeding post "${postData.title}":`, error);
    }
  }
  console.log('Posts seeding complete.');
}