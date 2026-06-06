import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFavorites } from '../../../contexts/FavoritesContext';
import { typeColors } from '../../../utils/typeColors';
import { formatPokemonId } from '../../../utils/formatPokemonId';
import type { Pokemon, PokemonType } from '../../../types/pokemon';
import './style.css';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  // Pega tipo principal para usar como cor de fundo
  const mainType = pokemon.types[0].type.name;
  const isFav = isFavorite(pokemon.id);

  // Evita navegação ao clicar em favorito (event bubbling)
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(pokemon);
  };

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="pokemon-card">
      <button 
        className={`favorite-btn ${isFav ? 'is-favorite' : ''}`}
        onClick={handleFavoriteClick}
        aria-label={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        <Heart size={20} fill={isFav ? 'currentColor' : 'none'} />
      </button>

      <div className="card-image" style={{ backgroundColor: `${typeColors[mainType]}33` }}>
        <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
      </div>
      <div className="card-info">
        <span className="pokemon-id">{formatPokemonId(pokemon.id)}</span>
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <div className="pokemon-types">
          {pokemon.types.map((t: PokemonType) => (
            <span 
              key={t.type.name} 
              className="type-badge"
              style={{ backgroundColor: typeColors[t.type.name] }}
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
