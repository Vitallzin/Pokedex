import React from 'react';
import type { PokemonStat } from '../../../types/pokemon';
import './style.css';

interface PokemonStatsProps {
  stats: PokemonStat[];
  color?: string;
}

// Mapeia nomes técnicos dos stats para labels em português
const statNames: { [key: string]: string } = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'ATK. ESP.',
  'special-defense': 'DEF. ESP.',
  speed: 'VEL',
};

export const PokemonStats: React.FC<PokemonStatsProps> = ({ stats, color }) => {
  // Valor máximo para calcular proporção de cada barra
  const maxStat = 255;

  return (
    <div className="stats-container">
      {stats.map((s) => (
        <div key={s.stat.name} className="stat-row">
          <span className="stat-name">{statNames[s.stat.name] || s.stat.name}</span>
          <span className="stat-value">{s.base_stat}</span>
          <div className="stat-bar-container">
            <div 
              className="stat-bar" 
              style={{ 
                width: `${(s.base_stat / maxStat) * 100}%`,
                backgroundColor: color || 'var(--primary-color)'
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};
