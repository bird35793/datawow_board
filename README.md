# Datawow Webboard

โปรเจกต์ไว้สำหรับทำการ โพสเว็บบอร์ดโ

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
    yarn install
    ```

2.  **ติดตั้ง Dependencies ของ Frontend:**

    ```bash
    cd frontend
    cp .env.rename .env
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
