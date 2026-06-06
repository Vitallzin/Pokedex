import React, { useEffect, useState } from 'react';
import { pokemonService } from '../../../services/pokemonService';
import { PokemonCard } from '../PokemonCard';
import type { Pokemon } from '../../../types/pokemon';
import './style.css';

interface SimilarPokemonsProps {
  type: string;
}

// Carrega pokemons do mesmo tipo para exibir como similares
export const SimilarPokemons: React.FC<SimilarPokemonsProps> = ({ type }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  // Busca pokemons do tipo quando component monta ou tipo muda
  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        const data = await pokemonService.getPokemonsByType(type);
        setPokemons(data);
      } catch (error) {
        console.error('Error fetching similar pokemons:', error);
      }
    };

    fetchSimilar();
  }, [type]);

  return (
    <div className="similar-scroll">
      {pokemons.map(pokemon => (
        <div key={pokemon.id} className="similar-card-wrapper">
          <PokemonCard pokemon={pokemon} />
        </div>
      ))}
    </div>
  );
};
