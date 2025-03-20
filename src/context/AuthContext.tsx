"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import useCurrentUser from "@/hooks/use-current-user.hook";
import "../../flow-config";

interface FlowUser {
  addr: string | null;
  loggedIn: boolean;
}

interface AuthContextType {
  user: FlowUser;
  loggedIn: boolean;
  logIn: () => Promise<void>;
  logOut: () => Promise<void>;
  error: unknown;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, loggedIn, logIn, logOut, error] = useCurrentUser();

  return (
    <AuthContext.Provider value={{ user, loggedIn, logIn, logOut, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
}
