import React from 'react';
import './style.css';

interface PokemonAnimationProps {
  id: number;
  name: string;
  size?: number;
}

// Exibe sprite animado do pokemon com fallback para artwork estático
export const PokemonAnimation: React.FC<PokemonAnimationProps> = ({ id, name, size = 150 }) => {
  // URL do GIF animado (Showdown sprites)
  const animatedUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;
  
  return (
    <div className="pokemon-animation" style={{ width: size, height: size }}>
      <img 
        src={animatedUrl} 
        alt={name} 
        className="animated-sprite"
        onError={(e) => {
          // Se GIF falhar, usa artwork oficial como fallback
          (e.target as HTMLImageElement).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        }}
      />
    </div>
  );
};
