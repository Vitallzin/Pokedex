import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';
import { authService } from '../services/authService';
import type { Pokemon } from '../types/pokemon';

// Estrutura de um time com até 6 pokémons
interface Team {
  id: string;
  name: string;
  pokemons: Pokemon[];
}

interface TeamContextType {
  teams: Team[];
  addTeam: (name: string) => void;
  deleteTeam: (teamId: string) => void;
  addToTeam: (teamId: string, pokemon: Pokemon) => void;
  removeFromTeam: (teamId: string, pokemonId: number) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  // Inicializa times do usuário atual armazenados no localStorage
  const [teams, setTeams] = useState<Team[]>(() => {
    const savedUser = authService.getUser();
    if (savedUser) {
      const saved = localStorage.getItem(`teams_${savedUser.id}`);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Cria novo time com ID único baseado em timestamp
  // Cria um novo time com ID único baseado em timestamp
  const addTeam = (name: string) => {
    if (!user) return;
    const newTeam = { id: Date.now().toString(), name, pokemons: [] };
    const updated = [...teams, newTeam];
    setTeams(updated);
    localStorage.setItem(`teams_${user.id}`, JSON.stringify(updated));
  };

  // Adiciona um pokémon ao time, respeitando o limite de 6 pokémons
  const addToTeam = (teamId: string, pokemon: Pokemon) => {
    setTeams(prev => {
      const updated = prev.map(t => {
        if (t.id === teamId && t.pokemons.length < 6) {
          return { ...t, pokemons: [...t.pokemons, pokemon] };
        }
        return t;
      });
      localStorage.setItem(`teams_${user!.id}`, JSON.stringify(updated));
      return updated;
    });
  };

  // Remove pokemon específico do time
  // Remove um pokémon específico de um time
  const removeFromTeam = (teamId: string, pokemonId: number) => {
    setTeams(prev => {
      const updated = prev.map(t => {
        if (t.id === teamId) {
          return { ...t, pokemons: t.pokemons.filter(p => p.id !== pokemonId) };
        }
        return t;
      });
      localStorage.setItem(`teams_${user!.id}`, JSON.stringify(updated));
      return updated;
    });
  };

  // Deleta o time completamente do usuário
  const deleteTeam = (teamId: string) => {
    if (!user) return;
    const updated = teams.filter(t => t.id !== teamId);
    setTeams(updated);
    localStorage.setItem(`teams_${user.id}`, JSON.stringify(updated));
  };

  return (
    <TeamContext.Provider value={{ teams, addTeam, deleteTeam, addToTeam, removeFromTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) throw new Error('useTeam must be used within TeamProvider');
  return context;
};
