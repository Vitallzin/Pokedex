// Lista de todos os 18 tipos Pokémon
export const pokemonTypes = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice', 
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

export const typeColors: { [key: string]: string } = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  steel: '#B7B7CE',
  fairy: '#D685AD',
  dark: '#705746'
};

// Tradução de tipos Pokémon para português
export const translateType: Record<string, string> = {
  normal: 'Normal', fire: 'Fogo', water: 'Água', grass: 'Planta',
  electric: 'Elétrico', ice: 'Gelo', fighting: 'Lutador', poison: 'Veneno',
  ground: 'Terrestre', flying: 'Voador', psychic: 'Psíquico', bug: 'Inseto',
  rock: 'Pedra', ghost: 'Fantasma', dragon: 'Dragão', steel: 'Aço',
  fairy: 'Fada', dark: 'Sombrio'
};

// Tradução de habilidades Pokémon para português
export const translateAbility: Record<string, string> = {
  overgrow: 'Supercrescimento', chlorophyll: 'Clorofila', blaze: 'Chama',
  solar_power: 'Poder Solar', torrent: 'Torrente', rain_dish: 'Prato de Chuva',
  shield_dust: 'Pó de Escudo', shed_skin: 'Troca de Pele', compound_eyes: 'Olhos Compostos',
  tinted_lens: 'Lente Colorida', swarm: 'Enxame', sniper: 'Sniper',
  keen_eye: 'Olhar Aguçado', tangled_feet: 'Pés Confusos', big_pecks: 'Peito Robusto',
  guts: 'Agudizar', intimidate: 'Intimidação', static: 'Estática',
  lightning_rod: 'Para-raios', sand_veil: 'Véu de Areia', inner_focus: 'Foco Interno',
  synchronize: 'Sincronizar', levitate: 'Levitação', sturdy: 'Resistente'
};

export const getTypeColor = (type: string): string => {
  return typeColors[type.toLowerCase()] || '#777';
};
