# Datawow Webboard

โปรเจกต์สำหรับสร้างเว็บบอร์ด

## เทคโนโลยีที่ใช้

<p align="center">
  <a href="https://nodejs.org/" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/Node.js-22.12.0-green?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  </a>
  <a href="https://nestjs.com/" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/NestJS-10.4.5-red?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  </a>
  <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/Next.js-15.1.5-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  </a>
  <a href="https://www.docker.com/" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/Docker-27.2.0-blue?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/TypeScript-^5-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
    <a href="https://www.postgresql.org/" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/PostgreSQL-16-blue?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  </a>
  <a href="https://www.prisma.io/" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/Prisma-^6.2.1-blueviolet?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  </a>
</p>

## ขั้นตอนการติดตั้ง

1.  **ติดตั้ง Dependencies ของ Backend:**

    ```bash
    cd backend
    cp .env.rename .env # แก้ชื่อไฟล์ .env
    yarn install
    ```

2.  **ติดตั้ง Dependencies ของ Frontend:**

    ```bash
    cd frontend
    cp .env.rename .env # แก้ชื่อไฟล์ .env
    yarn install
    ```

3.  **รัน Docker Compose:**

    กลับมาที่ root ของโปรเจกต์ แล้วรันคำสั่ง:

    ```bash
    cd .. # กลับมาที่ root (ถ้าจำเป็น)
    docker-compose up -d
    ```

    (คำอธิบายเพิ่มเติมเกี่ยวกับ Docker เช่น port ที่ใช้ หรือ volume ที่ mount)
    ตัวอย่าง: Docker จะรัน Backend ที่พอร์ต 3001 และ Frontend ที่พอร์ต 3000 โดยฐานข้อมูล PostgreSQL จะอยู่ใน container ของตัวเอง

4.  **Migrate ฐานข้อมูล (Prisma):**

    เข้าไปในโฟลเดอร์ `backend` แล้วรันคำสั่ง:

    ```bash
    cd backend
    npx prisma migrate deploy
    ```
    

5. **Seed ฐานข้อมูล (ใส่ข้อมูลตัวอย่าง):**
    หลังจาก Migrate ฐานข้อมูลเสร็จแล้ว สามารถรันคำสั่งต่อไปนี้เพื่อใส่ข้อมูลตัวอย่างลงในฐานข้อมูล
    ```bash
    npx prisma db seed
    ```

## การใช้งาน

### Environment Dev

1.  **รัน dev ของ Backend:**

    ```bash
    cd backend
    yarn start:dev
    ```

2.  **รัน dev ของ Frontend:**

    ```bash
    cd frontend
    yarn dev
    ```

### การเชื่อมต่อ API

Frontend เชื่อมต่อกับ Backend ผ่าน API ที่ `https://localhost:3001/api`

### Swagger Documentation

คุณสามารถดูเอกสาร API ได้ที่ `https://localhost:3001/swagger`

## ตัวแปรควบคุม

*   `DATABASE_URL`: URL สำหรับเชื่อมต่อฐานข้อมูล PostgreSQL
*   `JWT_SECRET`: Secret key สำหรับ JWT (สำคัญมาก ควรเก็บเป็นความลับ)

## ปัญหาที่พบบ่อย

*   **ปัญหา:** `Error: connect ECONNREFUSED 127.0.0.1:5432` (ไม่สามารถเชื่อมต่อกับ PostgreSQL ได้)
    *   **วิธีแก้ไข:** ตรวจสอบให้แน่ใจว่า Docker container ของ PostgreSQL รันอยู่ และ `DATABASE_URL` ใน `.env` ถูกต้อง


## การปรับแต่งหน้าตา (Frontend)

ในการปรับแต่งหน้าตาของเว็บบอร์ด (Frontend) คุณสามารถแก้ไขไฟล์ต่างๆ ภายในโฟลเดอร์ `frontend` ซึ่งใช้ Next.js โดยหลักการคือ:

*   แก้ไข component ต่างๆ ในโฟลเดอร์ `src/components`
*   แก้ไขหน้าต่างๆ ในโฟลเดอร์ `src/app`
*   ใช้ CSS หรือ tailwind framework เพื่อจัดการ styles