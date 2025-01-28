import * as yup from 'yup'; // Import yup
import { useState } from 'react';
import { RegisterFormData } from '@/types/auth'; // Import types

const registerSchema = yup.object().shape({ // Define schema outside the hook
    displayName: yup.string().required('กรุณากรอกชื่อที่แสดง').max(100, 'ชื่อที่แสดงต้องไม่เกิน 100 ตัวอักษร'),
    username: yup.string().required('กรุณากรอก Username').max(100, 'Username ต้องไม่เกิน 100 ตัวอักษร'),
    email: yup.string().required('กรุณากรอกอีเมล').email('อีเมลไม่ถูกต้อง').max(100, 'อีเมลต้องไม่เกิน 100 ตัวอักษร'),
    password: yup.string().required('กรุณากรอกรหัสผ่าน').min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัว'),
    confirmPassword: yup.string().required('กรุณายืนยันรหัสผ่าน').oneOf([yup.ref('password')], 'รหัสผ่านไม่ตรงกัน'),
});

export const useRegisterForm = () => {
    const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({
        displayName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string } | null>(null); // Use object for errors

    const handleRegisterInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRegisterFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegisterSubmit = async (event: React.FormEvent) => { // Rename to be more specific
        event.preventDefault();
        setIsLoading(true);
        setFormErrors(null);

        try {
            await registerSchema.validate(registerFormData, { abortEarly: false });
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: registerFormData.username, // Use email as username for backend
                    password: registerFormData.password,
                    email: registerFormData.email,
                    displayName: registerFormData.displayName, // Send display name
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();// get error from backend
                 throw new Error(errorData.message || 'Registration failed'); // throw with backend message or default
            }

            window.location.href = '/login';
        } catch (error) { // Type the error
          if (error instanceof yup.ValidationError) {
            const errors = error.inner.reduce((acc: { [key: string]: string }, err) => {
              if (err.path) {
                acc[err.path] = err.message;
              }
              return acc;
            }, {});
            setFormErrors(errors);
          } else {
            setFormErrors({general: (error as Error).message}); // set error with key general
          }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        registerFormData,
        showPassword,
        showConfirmPassword,
        isLoading,
        formErrors, // Rename error to formErrors
        setShowPassword,
        setShowConfirmPassword,
        handleRegisterSubmit, // Rename handleSubmit
        handleRegisterInputChange,
    };
};