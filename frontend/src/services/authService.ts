import {
  LoginFormData,
  UserDisplayName,
  ResponseLoginAuthDto,
} from '@/types/auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const authService = {
  async login(credentials: LoginFormData): Promise<ResponseLoginAuthDto> {
    // เปลี่ยน return type เป็น ResponseLoginAuthDto
    try {
      const response = await fetch(`${API_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const errorData = await response.json() // พยายาม parse error response จาก API
        throw new Error(errorData?.message || 'Login failed') // ใช้ error message จาก API ถ้ามี
      }

      const data: ResponseLoginAuthDto = await response.json() // กำหนด type ให้ data
      return data
    } catch (error) {
      throw error // ส่ง error ไปให้ component จัดการ
    }
  },

  saveTokens(accessToken: string): void {
    // รับเฉพาะ accessToken
    localStorage.setItem('accessToken', accessToken)
  },

  saveUser(user: UserDisplayName): void {
    localStorage.setItem('user', JSON.stringify(user))
  },

  getUser(): UserDisplayName | null {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  clearAuth(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
  },
}
