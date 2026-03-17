import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/mortgage';
import { mockUsers } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: User['role']) => Promise<boolean>;
  switchRole: (role: User['role']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem('mortgage_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find mock user or create demo user
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('mortgage_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    // For demo: allow any email with password "demo123"
    if (password === 'demo123') {
      const demoUser: User = {
        id: `user-${Date.now()}`,
        email,
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        role: 'consumer',
        createdAt: new Date(),
        kycStatus: 'pending',
      };
      setUser(demoUser);
      localStorage.setItem('mortgage_user', JSON.stringify(demoUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mortgage_user');
  };

  const register = async (email: string, password: string, name: string, role: User['role']): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role,
      createdAt: new Date(),
      kycStatus: 'pending',
    };
    
    setUser(newUser);
    localStorage.setItem('mortgage_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  // For demo purposes - switch between roles
  const switchRole = (role: User['role']) => {
    if (user) {
      const updatedUser = { ...user, role };
      if (role === 'lender') {
        updatedUser.lenderId = 'lender-1';
      }
      setUser(updatedUser);
      localStorage.setItem('mortgage_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register, switchRole }}>
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
