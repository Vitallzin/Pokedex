import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { pokemonService } from '../../services/pokemonService';
import { PokemonCard } from '../../components/pokemon/PokemonCard';
import { Loader } from '../../components/common/Loader';
import { Input } from '../../components/common/Input';
import type { Pokemon } from '../../types/pokemon';
import './style.css';

interface PokemonBasicInfo {
  name: string;
  id: number;
}
// Página principal da Pokédex com busca e scroll infinito
export const Pokedex: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [allPokemons, setAllPokemons] = useState<PokemonBasicInfo[]>([]);
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);

  // Cache de todos os pokemons para busca rápida em tempo real
  useEffect(() => {
    let isMounted = true;
    const fetchAll = async () => {
      try {
        const data = await pokemonService.getAllPokemons();
        if (isMounted) setAllPokemons(data);
      } catch (error) {
        console.error('Error fetching all pokemons:', error);
      }
    };
    fetchAll();
    return () => { isMounted = false; };
  }, []);

  // Carregamento paginado: evita dupes ao fazer scroll infinito
  useEffect(() => {
    let isMounted = true;
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const data = await pokemonService.getPokemonList(20, offset);
        
        if (isMounted) {
          setPokemons(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const newPokemons = data.results.filter((p: Pokemon) => !existingIds.has(p.id));
            return [...prev, ...newPokemons];
          });
        }
      } catch (error) {
        console.error('Error fetching pokemons:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (!searchQuery) {
      fetchPokemons();
    }

    return () => { isMounted = false; };
  }, [offset, searchQuery]);

  // Busca com debounce: Executa estritamente de forma assíncrona dentro do timer
  useEffect(() => {
    if (!searchQuery.trim()) {
      return;
    }
    // Limpa resultados anteriores e cancela busca se o usuário apagar o texto
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const filtered = allPokemons
          .filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.id.toString().includes(searchQuery)
          )
          .slice(0, 20);

        const details = await Promise.all(
          filtered.map(async (p) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.id}`);
            return response.json();
          })
        );
        // Atualiza resultados de busca com os detalhes completos dos pokemons encontrados
        setSearchResults(details);
      } catch (error) {
        console.error('Error searching pokemons:', error);
      } finally {
        setSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, allPokemons]);

  // Função controladora do Input: Resguarda o estado síncrono fora do useEffect
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Se o usuário apagou o texto, limpa os estados imediatamente aqui (Evento de UI)
    if (!value.trim()) {
      setSearchResults([]);
      setSearching(false);
    }
  };

  const handleLoadMore = () => {
    setOffset(prev => prev + 20);
  };

  const displayedPokemons = searchQuery.trim() ? searchResults : pokemons;

  return (
    <div className="pokedex-page">
      <div className="search-container">
        <Input
          placeholder="Pesquisar por nome ou número..."
          value={searchQuery}
          onChange={handleSearchChange}
          icon={!searchQuery ? <Search size={20} /> : undefined}
          className="pokedex-search"
        />
      </div>

      <div className="pokemon-grid">
        {displayedPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      
      {searching || (loading && !searchQuery) ? (
        <Loader />
      ) : (
        !searchQuery && (
          <button className="load-more" onClick={handleLoadMore}>
            Carregar mais
          </button>
        )
      )}

      {searchQuery && !searching && searchResults.length === 0 && (
        <div className="no-results">
          Nenhum Pokémon encontrado.
        </div>
      )}
    </div>
  );
};