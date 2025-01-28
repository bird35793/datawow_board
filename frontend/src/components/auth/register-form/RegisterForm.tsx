'use client'

import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRegisterForm } from './useRegisterForm'

export function RegisterForm() {
  const {
    registerFormData,
    showPassword,
    showConfirmPassword,
    isLoading,
    formErrors, // Use formErrors
    setShowPassword,
    setShowConfirmPassword,
    handleRegisterSubmit, // Use handleRegisterSubmit
    handleRegisterInputChange,
  } = useRegisterForm()

  console.log('formErrors', formErrors)

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8 text-center">
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-700 flex items-center gap-2 justify-center mb-6"
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
        <h1 className="text-3xl font-bold text-gray-900">ลงทะเบียน</h1>
        <p className="text-gray-600 mt-2">Webboard Dekend</p>
      </div>

      {formErrors && (
        <div className="error-alert error-alert-danger">
          {/* Display specific error messages based on formErrors */}
          {formErrors.username && <p>- {formErrors.username}</p>}
          {formErrors.displayName && <p>- {formErrors.displayName}</p>}
          {formErrors.email && <p>- {formErrors.email}</p>}
          {formErrors.password && <p>- {formErrors.password}</p>}
          {formErrors.confirmPassword && <p>- {formErrors.confirmPassword}</p>}
        </div>
      )}

      <form onSubmit={handleRegisterSubmit} className="space-y-4">
        <Input
          type="text"
          id="displayName"
          name="displayName"
          label="ชื่อที่แสดง"
          value={registerFormData.displayName}
          onChange={handleRegisterInputChange}
          className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500 ${
            formErrors?.displayName ? 'border-red-500' : 'border-gray-300'
          }`}
          onMouseEnter={() =>
            document
              .getElementById('displayName')
              ?.classList.add('hover:border-green-500')
          }
          onMouseLeave={() =>
            document
              .getElementById('displayName')
              ?.classList.remove('hover:border-green-500')
          }
        />

        <Input
          type="text"
          id="username"
          name="username"
          label="Username"
          value={registerFormData.username}
          onChange={handleRegisterInputChange}
          className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500 ${
            formErrors?.username ? 'border-red-500' : 'border-gray-300'
          }`}
          onMouseEnter={() =>
            document
              .getElementById('username')
              ?.classList.add('hover:border-green-500')
          }
          onMouseLeave={() =>
            document
              .getElementById('username')
              ?.classList.remove('hover:border-green-500')
          }
        />

        <Input
          type="text"
          id="email"
          name="email"
          label="อีเมล"
          value={registerFormData.email}
          onChange={handleRegisterInputChange}
          className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500 ${
            formErrors?.email ? 'border-red-500' : 'border-gray-300'
          }`}
          onMouseEnter={() =>
            document
              .getElementById('email')
              ?.classList.add('hover:border-green-500')
          }
          onMouseLeave={() =>
            document
              .getElementById('email')
              ?.classList.remove('hover:border-green-500')
          }
        />

        <Input
          type="password"
          id="password"
          name="password"
          label="รหัสผ่าน"
          value={registerFormData.password}
          onChange={handleRegisterInputChange}
          showPassword={showPassword}
          onShowPasswordClick={() => setShowPassword(!showPassword)}
          className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500 ${
            formErrors?.password ? 'border-red-500' : 'border-gray-300'
          }`}
          onMouseEnter={() =>
            document
              .getElementById('password')
              ?.classList.add('hover:border-green-500')
          }
          onMouseLeave={() =>
            document
              .getElementById('password')
              ?.classList.remove('hover:border-green-500')
          }
        />
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          label="ยืนยันรหัสผ่าน"
          value={registerFormData.confirmPassword}
          onChange={handleRegisterInputChange}
          showPassword={showConfirmPassword}
          onShowPasswordClick={() =>
            setShowConfirmPassword(!showConfirmPassword)
          }
          className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500 ${
            formErrors?.confirmPassword ? 'border-red-500' : 'border-gray-300'
          }`}
          onMouseEnter={() =>
            document
              .getElementById('confirmPassword')
              ?.classList.add('hover:border-green-500')
          }
          onMouseLeave={() =>
            document
              .getElementById('confirmPassword')
              ?.classList.remove('hover:border-green-500')
          }
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {' '}
          {/* Make button full width */}
          {isLoading ? 'กำลังดำเนินการ...' : 'ดำเนินการต่อ'}
        </Button>

        <p className="text-center text-gray-600 mt-6">
          มีบัญชีอยู่แล้ว?{' '}
          <Link href="/login" className="text-green-500 hover:text-green-600">
            เข้าสู่ระบบ
          </Link>
        </p>
      </form>
    </div>
  )
}
