'use client'

import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useLoginForm } from '@/components/auth/login-form/useLoginForm'

export function LoginForm() {
  const {
    formData,
    showPassword,
    isLoading,
    formErrors,
    setShowPassword,
    handleSubmit,
    handleInputChange,
  } = useLoginForm()

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-700 flex items-center gap-2 mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          กลับสู่หน้าหลัก
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">เข้าสู่ระบบ</h1>
        <p className="text-gray-600 mt-2">
          ยินดีต้อนรับกลับ! กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ
        </p>
      </div>

      {formErrors && (
        <div className="error-alert error-alert-danger">
          {/* Display specific error messages based on formErrors */}
          {formErrors.username && <p>- {formErrors.username}</p>}
          {formErrors.password && <p>- {formErrors.password}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          id="username"
          name="username"
          label="ชื่อผู้ใช้"
          value={formData.username}
          onChange={handleInputChange}
        />

        <Input
          type="password"
          id="password"
          name="password"
          label="รหัสผ่าน"
          value={formData.password}
          onChange={handleInputChange}
          showPassword={showPassword}
          onShowPasswordClick={() => setShowPassword(!showPassword)}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              จดจำฉันไว้
            </label>
          </div>

          <Link
            href="/forgot-password"
            className="text-sm text-green-500 hover:text-green-600"
          >
            ลืมรหัสผ่าน?
          </Link>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </Button>

        <p className="text-center text-gray-600 mt-6">
          ยังไม่มีบัญชี?{' '}
          <Link
            href="/register"
            className="text-green-500 hover:text-green-600"
          >
            ลงทะเบียน
          </Link>
        </p>
      </form>
    </div>
  )
}
