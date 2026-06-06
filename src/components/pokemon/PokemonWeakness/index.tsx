import React from 'react';
import './style.css';

interface PokemonWeaknessProps {
  weaknesses: string[];
}

// Exibe lista de tipos que causam dano aumentado ao pokémon (efetividade 2x)
export const PokemonWeakness: React.FC<PokemonWeaknessProps> = ({ weaknesses }) => {
  return (
    <div className="pokemon-weakness-container">
      <h4 className="weakness-title">Fraquezas</h4>
      {/* Lista de tipos com badge colorida por tipo */}
      <div className="weakness-list">
        {weaknesses.length > 0 ? (
          weaknesses.map((type) => (
            <span key={type} className={`weakness-badge ${type}`}>
              {type}
            </span>
          ))
        ) : (
          <p className="no-weaknesses">Nenhuma fraqueza</p>
        )}
      </div>
    </div>
  );
};
