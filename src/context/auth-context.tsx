'use client';

import {
  createContext,
  use,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import userData from '../../data/user.json';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarInitials: string;
}

interface AuthContextValue {
  user: User | null;
  logout: () => void;
  loginBack: () => void;
}

const STORAGE_KEY = 'fsc-auth-token';
const INIT_KEY = 'fsc-auth-initialized';

const MOCK_JWT = process.env.NEXT_PUBLIC_MOCK_JWT ?? '';

function readAuthState(): boolean {
  const token = localStorage.getItem(STORAGE_KEY);
  if (token === null && !localStorage.getItem(INIT_KEY)) {
    localStorage.setItem(STORAGE_KEY, MOCK_JWT);
    localStorage.setItem(INIT_KEY, 'true');
    return true;
  }
  return token !== null;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    setIsLoggedIn(readAuthState());
  }, [pathname]);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    router.push('/logged-out');
  }, [router]);

  const loginBack = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, MOCK_JWT);
    router.push('/');
  }, [router]);

  if (isLoggedIn === null) return null;

  const user = isLoggedIn ? (userData as User) : null;

  return (
    <AuthContext value={{ user, logout, loginBack }}>{children}</AuthContext>
  );
}

export function useAuth(): AuthContextValue {
  const context = use(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
