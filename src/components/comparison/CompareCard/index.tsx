import React from 'react';
import { Card } from '../../common/Card';
import  { PokemonTypes } from '../../pokemon/PokemonTypes';
import { PokemonAnimation } from '../../pokemon/PokemonAnimation';
import type { Pokemon } from '../../../types/pokemon';
import './style.css';

interface CompareCardProps {
  pokemon: Pokemon;
  onRemove?: () => void;
}

// Card exibindo dados do pokemon na comparação com opção de remover
export const CompareCard: React.FC<CompareCardProps> = ({ pokemon, onRemove }) => {
  if (!pokemon) return null;

  return (
    <Card className="compare-card" padding="md">
      {/* Botão para remover pokemon da comparação */}
      {onRemove && (
        <button className="remove-btn" onClick={onRemove} aria-label="Remover">
          ✕
        </button>
      )}
      
      <div className="compare-card-content">
        <PokemonAnimation id={pokemon.id} name={pokemon.name} size={120} />
        
        <div className="pokemon-info">
          <span className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</span>
          <h3 className="pokemon-name">{pokemon.name}</h3>
          <PokemonTypes types={pokemon.types} size="sm" />
        </div>
      </div>
    </Card>
  );
};
