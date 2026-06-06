import React from 'react';
import { useFavorites } from '../../hooks/useFavorites';
import { PokemonCard } from '../../components/pokemon/PokemonCard';
import './style.css';

// Página de pokémons favoritados do usuário
export const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h2>Meus Favoritos</h2>
        <p>Acompanhe todos os Pokémons que você favoritou.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <div className="empty-icon">❤️</div>
          <h3>Sua lista está vazia</h3>
          <p>Explore a Pokédex e favorite seus Pokémons preferidos!</p>
        </div>
      ) : (
        <div className="pokemon-grid">
          {favorites.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};
