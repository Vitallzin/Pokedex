import axios from 'axios'; // Importa tipos para garantir tipagem correta dos dados
import type { Pokemon, EvolutionNode, PokemonDetail, PokemonSpecies } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

interface PokemonListResponse {
  results: { name: string; url: string }[];
  count: number;
}

export const pokemonService = {
  async getPokemonList(limit = 20, offset = 0) {
    const response = await axios.get<PokemonListResponse>(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    // Carrega dados completos de cada pokemon em paralelo
    const results = await Promise.all(
      response.data.results.map(async (p: { url: string }) => {
        const detail = await axios.get<Pokemon>(p.url);
        return detail.data;
      })
    );
    return {
      count: response.data.count,
      results
    };
  },

  async getPokemonDetail(nameOrId: string | number): Promise<PokemonDetail> {
    const response = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${nameOrId}`);
    const species = await axios.get<PokemonSpecies>(response.data.species.url);
    
    // Carrega cadeia evolutiva em paralelo
    const evolutionChain = await axios.get<{ chain: EvolutionNode }>(species.data.evolution_chain.url);

    return {
      ...response.data,
      species: species.data,
      evolutionChain: evolutionChain.data.chain
    };
  },

  async getAllPokemons() {
    const response = await axios.get(`${BASE_URL}/pokemon?limit=2000`);
    // Extrai ID do URL para simplificar lista de pokemons
    return response.data.results.map((p: { name: string; url: string }) => {
      const id = parseInt(p.url.split('/').filter(Boolean).pop() || '0');
      return { name: p.name, id };
    });
  },

  async getPokemonsByType(type: string) {
    const response = await axios.get(`${BASE_URL}/type/${type}`);
    // Limita a 10 pokemons similares para evitar muitas requisições
    const pokemonLinks = response.data.pokemon.slice(0, 10);
    // Carrega dados completos em paralelo
    const results = await Promise.all(
      pokemonLinks.map(async (p: { pokemon: { url: string } }) => {
        const detail = await axios.get<Pokemon>(p.pokemon.url);
        return detail.data;
      })
    );
    return results;
  }
};
