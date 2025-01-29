import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ตรวจสอบว่ามี token ใน localStorage หรือ cookies หรือไม่
    const token = localStorage.getItem('access_token'); // หรือตรวจสอบจาก cookies
    setIsLoggedIn(!!token);
  }, []);

  return { isLoggedIn };
};