// compareStats.ts
import type { Pokemon } from '../types/pokemon';
import { calculateEffectiveness } from '../data/typeAdvantages';

// Busca valor de um stat específico do pokemon
export function getStatValue(p: Pokemon, statName: string): number {
  const found = p.stats.find(s => s.stat.name === statName);
  return found ? found.base_stat : 0;
}

/**
 * Simula um duelo: calcula dano potencial, quantos turnos leva para vencer
 * e considera efetividade de tipo (STAB = Same Type Attack Bonus)
 */
export function calculateBattleMatchup(p1: Pokemon, p2: Pokemon) {
  const p1Types = p1.types.map(t => t.type.name);
  const p2Types = p2.types.map(t => t.type.name);

  const atk1 = getStatValue(p1, 'attack');
  const spa1 = getStatValue(p1, 'special-attack');
  const speed1 = getStatValue(p1, 'speed');

  const hp2 = getStatValue(p2, 'hp');
  const def2 = getStatValue(p2, 'defense');
  const spd2 = getStatValue(p2, 'special-defense');

  // Encontra o maior dano possível considerando ambos os tipos de ataque (físico e especial)
  let bestP1Damage = 0;
  
  p1Types.forEach(type => {
    const effectiveness = calculateEffectiveness([type], p2Types);
    
    // Fórmula simplificada: considera ataque físico ou especial com bônus STAB (1.5x)
    const physicalDmg = (atk1 / Math.max(def2, 1)) * effectiveness * 1.5;
    const specialDmg = (spa1 / Math.max(spd2, 1)) * effectiveness * 1.5;
    
    const maxDmg = Math.max(physicalDmg, specialDmg);
    if (maxDmg > bestP1Damage) bestP1Damage = maxDmg;
  });

  // Fallback se não houver dano com STAB (ex: tipo imune)
  if (bestP1Damage === 0) {
    const physNeutral = (atk1 / Math.max(def2, 1));
    const specNeutral = (spa1 / Math.max(spd2, 1));
    bestP1Damage = Math.max(physNeutral, specNeutral);
  }

  const turnsToKillP2 = hp2 / (bestP1Damage || 1);

  return {
    damagePotential: bestP1Damage,
    turnsToKill: turnsToKillP2,
    speed: speed1,
    effectiveness: calculateEffectiveness(p1Types, p2Types)
  };
}

/**
 * Determina o vencedor comparando:
 * 1. Velocidade para atacar primeiro
 * 2. Diferença de turnos para vencer
 * 3. Vantagem de tipo e diferença de stats
 */
export function getBattleVerdict(p1: Pokemon, p2: Pokemon) {
  const analysis1 = calculateBattleMatchup(p1, p2);
  const analysis2 = calculateBattleMatchup(p2, p1);

  let winner: 'p1' | 'p2' | 'draw';
  let reason = '';

  // Critério 1: Quem mata mais rápido
  if (analysis1.turnsToKill < analysis2.turnsToKill) {
    winner = 'p1';
  } else if (analysis2.turnsToKill < analysis1.turnsToKill) {
    winner = 'p2';
  // Critério 2: Se tempo igual, quem é mais rápido (ataca primeiro)
  } else if (analysis1.speed > analysis2.speed) {
    winner = 'p1';
  } else if (analysis2.speed > analysis1.speed) {
    winner = 'p2';
  } else {
    winner = 'draw';
  }

  const w = winner === 'p1' ? p1 : p2;
  const l = winner === 'p1' ? p2 : p1;
  const wAn = winner === 'p1' ? analysis1 : analysis2;
  const lAn = winner === 'p1' ? analysis2 : analysis1;

  // Gera explicação textual baseada nos fatores da vitória
  if (winner === 'draw') {
    reason = `Ambos os Pokémon possuem um nível de força e tipos muito equilibrados, resultando em um duelo sem vantagem clara para nenhum dos lados.`;
  } else {
    const typeAdv = wAn.effectiveness > 1;
    const typeDisadv = wAn.effectiveness < 1;
    const faster = wAn.speed > lAn.speed;
    const muchStronger = (lAn.turnsToKill / wAn.turnsToKill) > 1.5;

    if (typeAdv && muchStronger) {
      reason = `${w.name} domina o confronto pois possui vantagem de tipo e estatísticas muito superiores a ${l.name}.`;
    } else if (typeAdv) {
      reason = `A vantagem de tipo de ${w.name} é o fator decisivo para superar a resistência de ${l.name}.`;
    } else if (typeDisadv && muchStronger) {
      reason = `Apesar da desvantagem de tipo, o poder bruto e os status elevados de ${w.name} permitem que ele supere ${l.name}.`;
    } else if (muchStronger) {
      reason = `${w.name} vence este duelo devido à grande superioridade em seus status base em comparação a ${l.name}.`;
    } else if (faster) {
      reason = `Em um combate equilibrado, a maior velocidade de ${w.name} permite que ele ataque primeiro e garanta a vitória sobre ${l.name}.`;
    } else {
      reason = `${w.name} possui uma leve vantagem estratégica e estatística que o coloca à frente de ${l.name} nesta disputa.`;
    }
  }

  return {
    winner,
    reason,
    details: {
      p1: analysis1,
      p2: analysis2
    }
  };
}
  }

  const w = winner === 'p1' ? p1 : p2;
  const l = winner === 'p1' ? p2 : p1;
  const wAn = winner === 'p1' ? analysis1 : analysis2;
  const lAn = winner === 'p1' ? analysis2 : analysis1;

  if (winner === 'draw') {
    reason = `Ambos os Pokémon possuem um nível de força e tipos muito equilibrados, resultando em um duelo sem vantagem clara para nenhum dos lados.`;
  } else {
    const typeAdv = wAn.effectiveness > 1;
    const typeDisadv = wAn.effectiveness < 1;
    const faster = wAn.speed > lAn.speed;
    const muchStronger = (lAn.turnsToKill / wAn.turnsToKill) > 1.5;

    if (typeAdv && muchStronger) {
      reason = `${w.name} domina o confronto pois possui vantagem de tipo e estatísticas muito superiores a ${l.name}.`;
    } else if (typeAdv) {
      reason = `A vantagem de tipo de ${w.name} é o fator decisivo para superar a resistência de ${l.name}.`;
    } else if (typeDisadv && muchStronger) {
      reason = `Apesar da desvantagem de tipo, o poder bruto e os status elevados de ${w.name} permitem que ele supere ${l.name}.`;
    } else if (muchStronger) {
      reason = `${w.name} vence este duelo devido à grande superioridade em seus status base em comparação a ${l.name}.`;
    } else if (faster) {
      reason = `Em um combate equilibrado, a maior velocidade de ${w.name} permite que ele ataque primeiro e garanta a vitória sobre ${l.name}.`;
    } else {
      reason = `${w.name} possui uma leve vantagem estratégica e estatística que o coloca à frente de ${l.name} nesta disputa.`;
    }
  }

  return {
    winner,
    reason,
    details: {
      p1: analysis1,
      p2: analysis2
    }
  };
}