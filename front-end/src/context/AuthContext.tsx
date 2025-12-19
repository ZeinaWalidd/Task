import { createContext, useState, useContext, type ReactNode } from 'react';
import api from '../services/api';

interface User {
  id: number;
  fullName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const signup = async (fullName: string, email: string, password: string) => {
    const res = await api.post('/auth/signup', { fullName, email, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
  };

  const signin = async (email: string, password: string) => {
    const res = await api.post('/auth/signin', { email, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, signup, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};