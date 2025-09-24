'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { readStorage, removeStorage, writeStorage } from '@/utils/storage';

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

type SignInPayload = {
  name: string;
  email: string;
  phone?: string;
};

type AuthContextValue = {
  user: UserProfile | null;
  signIn: (payload: SignInPayload) => void;
  signOut: () => void;
};

const AUTH_STORAGE_KEY = 'lv-auth-user';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const stored = readStorage<UserProfile | null>(AUTH_STORAGE_KEY, null);
    if (stored) {
      setUser(stored);
    }
  }, []);

  const signIn = (payload: SignInPayload) => {
    const nextUser: UserProfile = {
      id: payload.email,
      ...payload
    };
    setUser(nextUser);
    writeStorage(AUTH_STORAGE_KEY, nextUser);
  };

  const signOut = () => {
    setUser(null);
    removeStorage(AUTH_STORAGE_KEY);
  };

  const value = useMemo<AuthContextValue>(() => ({ user, signIn, signOut }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within <AuthProvider>');
  }
  return ctx;
}
