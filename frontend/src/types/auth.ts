export interface LoginFormData {
  username: string
  password: string
}

export interface RegisterFormData {
  email: string
  password: string
  confirmPassword: string
  username: string
  displayName: string
}

export interface UserDisplayName {
  displayName: string
}

export interface ResponseLoginAuthDto {
  access_token: string
  user: UserDisplayName
}

// ตัวอย่าง RegisterResponse type (ปรับตาม response จริงจาก backend)
export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  createdByUser: UserDisplayName;
}

export interface AuthTokens {
  access: string
  refresh: string
}

export interface User {
  id: number
  username: string
  email: string
  displayName: string
}
