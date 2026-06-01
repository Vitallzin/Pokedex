// Tipagem de um tipo Pokémon (Fire, Water, etc.)
export interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

// Tipagem de um stat individual (HP, ATK, DEF, etc.)
export interface PokemonStat {
  base_stat: number; // Valor base do stat
  effort: number;    // EV (Effort Value) que contribui
  stat: {
    name: string;
    url: string;
  };
}

// Tipagem de uma habilidade Pokémon
export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean; // Se é habilidade oculta
  slot: number;       // Posição na lista de habilidades
}

// Tipagem completa de um Pokémon com todos os dados
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
      dream_world: {
        front_default: string;
      };
    };
  };
  species: {
    name: string;
    url: string;
  };
}
// Tipagem simplificada para lista de pokemons (apenas nome e ID)
export interface EvolutionNode {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionNode[];
}
// Tipagem de dados de espécie Pokémon, incluindo texto de descrição e link para cadeia evolutiva
export interface PokemonSpecies {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
  evolution_chain: {
    url: string;
  };
}
// Tipagem de detalhes completos de um Pokémon, incluindo dados de espécie e cadeia evolutiva
export interface PokemonDetail extends Omit<Pokemon, 'species'> {
  species: PokemonSpecies;
  evolutionChain: EvolutionNode;
}
