import { typeAdvantages } from '../data/typeAdvantages';

/**
 * Calcula tipos fracos contra um pokemon (tipos que fazem dano aumentado).
 * Para pokemon dual-type, multiplica as efetividades de ambos os tipos.
 * Ex: Water-type sofre 2x de Electric e 4x de Grass (2x * 2x)
 */
export const calculateWeaknesses = (types: string[]): string[] => {
  const effectiveness: { [key: string]: number } = {};
  
  // Inicializa todos os tipos com efetividade 1x
  Object.keys(typeAdvantages).forEach(type => {
    effectiveness[type] = 1;
  });

  // Multiplica as efetividades: se pokemon tem 2 tipos, ambos contribuem
  types.forEach(defenderType => {
    Object.keys(typeAdvantages).forEach(attackerType => {
      const multiplier = typeAdvantages[attackerType][defenderType] ?? 1;
      effectiveness[attackerType] *= multiplier;
    });
  });

  // Retorna apenas tipos que fazem dano aumentado (> 1x)
  return Object.keys(effectiveness).filter(type => effectiveness[type] > 1);
};
