// Formata ID de pokémon com padding de zeros (ex: 1 -> #001)
export const formatPokemonId = (id: number): string => {
  return `#${id.toString().padStart(3, '0')}`;
};
