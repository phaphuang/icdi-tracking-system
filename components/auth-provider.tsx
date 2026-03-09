"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type Role = 'student' | 'advisor' | 'coordinator' | 'executive' | null;

interface AuthContextType {
  role: Role;
  setRole: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('icdi_role') as Role;
    if (savedRole) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRoleState(savedRole);
    }
  }, []);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    if (newRole) {
      localStorage.setItem('icdi_role', newRole);
    } else {
      localStorage.removeItem('icdi_role');
    }
  };

  const logout = () => {
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
