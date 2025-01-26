// src/hooks/useAuth.ts
import React, { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';

interface BackendUser {
  displayName: string;
  id: number;
  email: string;
}

interface User {
  userId: number;
  username: string;
  email: string;
  access_token: string;
  displayName: string;
}

interface AuthContextProps {
  user: User | null;
  login: (data: { access_token: string; user: BackendUser }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (data: { access_token: string; user: BackendUser }) => {
    try {
      const payload = JSON.parse(atob(data.access_token.split('.')[1]));
      const userObject: User = {
        userId: payload.sub,
        username: payload.username,
        email: payload.email,
        access_token: data.access_token,
        displayName: data.user.displayName,
      };

      setUser(userObject);
      localStorage.setItem('user', JSON.stringify(userObject));
      router.push('/');
    } catch (error) {
      console.error("Error decoding or saving token:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    // <AuthContext.Provider value={{ user, login, logout }}>
    //   {children}
    // </AuthContext.Provider>
    {children}
  );
};