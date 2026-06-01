import React, { createContext, useState, useContext } from 'react';
import { authService } from '../services/authService';

// Representa um usuário autenticado no app
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Tipos e ações disponíveis no contexto de autenticação
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicializa usuário a partir do localStorage apenas na primeira renderização
  const [user, setUser] = useState<User | null>(() => authService.getUser());
  const [isLoading, setIsLoading] = useState(false);

  // Realiza login e atualiza estado de usuário
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const newUser = await authService.login(email, password);
      setUser(newUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Registra novo usuário e guarda no estado
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const newUser = await authService.register(name, email, password);
      setUser(newUser);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Atualiza dados do usuário e reflete no estado global
  const updateUser = async (userData: Partial<User>) => {
    setIsLoading(true);
    try {
      const updatedUser = await authService.updateUser(userData);
      setUser(updatedUser);
    } catch (error) {
      console.error('Update failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout limpa o usuário e remove dados de sessão simulada
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register,
      updateUser,
      logout, 
      isAuthenticated: !!user,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};