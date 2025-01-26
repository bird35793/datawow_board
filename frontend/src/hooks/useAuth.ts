// src/hooks/useAuth.ts
import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextProps {
  user: { userId: number; username: string; email: string, access_token: string } | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthContextProps['user']>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (token: string) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userObject = {
            userId: payload.sub,
            username: payload.username,
            email: payload.email,
            access_token: token
        }
        setUser(userObject);
        localStorage.setItem('user', JSON.stringify(userObject));
        router.push('/');
    } catch (error) {
        console.error("error decode token", error)
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};