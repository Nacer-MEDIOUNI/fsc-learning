'use client';

import {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
  useCallback,
  useMemo,
} from 'react';
import type { ReactNode } from 'react';
import { useRouter } from '@/i18n/navigation';

const STORAGE_KEY = 'fsc-auth-token';
const MOCK_TOKEN = 'mock-jwt-fsc-learning-2026';

interface AuthUser {
  name: string;
  email: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  logout: () => void;
  loginBack: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  useLayoutEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (!token) {
      localStorage.setItem(STORAGE_KEY, MOCK_TOKEN);
    }
    setUser({ name: 'Sarah', email: 'sarah.richter@fsc.org' });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    router.push('/logged-out');
  }, [router]);

  const loginBack = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, MOCK_TOKEN);
    setUser({ name: 'Sarah', email: 'sarah.richter@fsc.org' });
    router.push('/');
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      logout,
      loginBack,
    }),
    [user, logout, loginBack],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
