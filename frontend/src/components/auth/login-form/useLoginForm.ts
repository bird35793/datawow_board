"use client";

import * as yup from "yup";
import { useState } from "react";
import { LoginFormData, ResponseLoginAuthDto } from "@/types/auth";
import { authService } from "@/services/authService";

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required("กรุณากรอก Username")
    .max(100, "Username ต้องไม่เกิน 100 ตัวอักษร"),
  password: yup
    .string()
    .required("กรุณากรอกรหัสผ่าน")
    .min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัว"),
});

export function useLoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    [key: string]: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setFormErrors(null);

    try {
      await loginSchema.validate(formData, { abortEarly: false });
      const response: ResponseLoginAuthDto = await authService.login(formData);

      if (response && response.access_token && response.user) {
        authService.saveTokens(response.access_token);
        authService.saveUser(response.user);
        window.location.href = "/";
      } else {
        setFormErrors({ general: "Response จาก API ไม่ถูกต้อง" });
        console.error("Invalid API response:", response);
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = error.inner.reduce(
          (acc: { [key: string]: string }, err) => {
            if (err.path) {
              acc[err.path] = err.message;
            }
            return acc;
          },
          {}
        );
        setFormErrors(errors);
      } else if (error) {
        setFormErrors({ general: (error as Error).message }); // set error with key general
      } else {
        setFormErrors({
          general: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return {
    formData,
    showPassword,
    isLoading,
    formErrors,
    setShowPassword,
    handleSubmit,
    handleInputChange,
  };
}
