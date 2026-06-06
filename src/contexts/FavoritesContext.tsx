import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';
import { authService } from '../services/authService';
import type { Pokemon } from '../types/pokemon';

// Tipos disponíveis no contexto de favoritos
interface FavoritesContextType {
  favorites: Pokemon[];
  toggleFavorite: (pokemon: Pokemon) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  // Inicializa favoritos do usuário atual salvo no localStorage
  const [favorites, setFavorites] = useState<Pokemon[]>(() => {
    const savedUser = authService.getUser();
    if (savedUser) {
      const saved = localStorage.getItem(`favorites_${savedUser.id}`);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Adiciona ou remove um Pokémon dos favoritos com persistência local
  const toggleFavorite = (pokemon: Pokemon) => {
    if (!user) return;
    setFavorites(prev => {
      const isFav = prev.find(p => p.id === pokemon.id);
      let updated;
      if (isFav) {
        updated = prev.filter(p => p.id !== pokemon.id);
      } else {
        updated = [...prev, pokemon];
      }
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (id: number) => {
    return !!favorites.find(p => p.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};
