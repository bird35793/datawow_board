# Project Name (ใส่ชื่อโปรเจกต์ของคุณที่นี่)

คำอธิบายสั้นๆ เกี่ยวกับโปรเจกต์ (เช่น โปรเจกต์นี้ทำอะไร มีฟังก์ชันอะไรบ้าง)

## เทคโนโลยีที่ใช้

*   Node.js: v22.12.0
*   NestJS: v10.4.5
*   Next.js: v15.1.5
*   Docker: v27.2.0
*   TypeScript: v^5
*   PostgreSQL: v16
*   Prisma: v^6.2.1

## ขั้นตอนการติดตั้ง

1.  **ติดตั้ง Dependencies ของ Backend:**

    ```bash
    cd backend
    yarn install
    ```

2.  **ติดตั้ง Dependencies ของ Frontend:**

    ```bash
    cd frontend
    yarn install
    ```

3.  **รัน Docker Compose:**

    กลับมาที่ root ของโปรเจกต์ แล้วรันคำสั่ง:

    ```bash
    cd .. # กลับมาที่ root (ถ้าจำเป็น)
    docker-compose up -d
    ```

    (คำอธิบายเพิ่มเติมเกี่ยวกับ Docker เช่น port ที่ใช้ หรือ volume ที่ mount)

4.  **Migrate ฐานข้อมูล (Prisma):**

    เข้าไปในโฟลเดอร์ `backend` แล้วรันคำสั่ง:

    ```bash
    cd backend
    npx prisma migrate deploy
    ```

## การใช้งาน (ถ้ามี)

(อธิบายวิธีการใช้งานโปรเจกต์ เช่น วิธีการรัน development server, API endpoints, หรืออื่นๆ)

## ตัวแปรควบคุม (ถ้ามี)

(อธิบายตัวแปร environment ที่ใช้ เช่น `.env` files, และความหมายของแต่ละตัวแปร)

## ปัญหาที่พบบ่อย (ถ้ามี)

(รวบรวมปัญหาที่อาจเกิดขึ้นและวิธีการแก้ไข)

## การพัฒนา

(อธิบายขั้นตอนการพัฒนาต่อ เช่น การสร้าง branch, การ commit, หรืออื่นๆ)

## ลิขสิทธิ์ (ถ้ามี)

(ระบุลิขสิทธิ์ของโปรเจกต์)