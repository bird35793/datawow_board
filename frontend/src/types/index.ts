// src/types/index.ts
export interface CommentPostDto {
    // id: number;
    displayName: string;
    // ... ข้อมูลอื่นๆ ของ User ถ้ามี
  }
  
  export interface ResponseSelectCommentDto {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt?: Date; // updatedAt อาจเป็น optional
    createdByUser: CommentPostDto; // ใช้ CommentPostDto
    updatedByUser?: CommentPostDto; // updatedByUser อาจเป็น optional
    isActive: boolean;
  }
  
  export interface ResponseSelectPostDto {
      id: number;
      title: string;
      content: string;
      createdAt: Date;
      updatedAt?: Date;
      authorDisplayName: string;
      isActive: boolean;
  }
  
  export interface AuthContextProps {
      user: { userId: number; username: string; email: string, access_token: string } | null;
      login: (token: string) => void;
      logout: () => void;
  }