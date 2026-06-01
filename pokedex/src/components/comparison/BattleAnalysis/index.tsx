import React from 'react';
import { Swords, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import type { Pokemon } from '../../../types/pokemon';
import { getBattleVerdict } from '../../../utils/compareStats';
import './style.css';

interface BattleAnalysisProps {
  p1: Pokemon;
  p2: Pokemon;
}

// Exibe análise detalhada da batalha entre dois pokémons com veredito de vantagem
export const BattleAnalysis: React.FC<BattleAnalysisProps> = ({ p1, p2 }) => {
  // Calcula veredito baseado em tipos, efetividade e stats
  const verdict = getBattleVerdict(p1, p2);
  const { p1: p1Details, p2: p2Details } = verdict.details;

  // Define pokémon vencedor ou empate
  const winner = verdict.winner === 'p1' ? p1 : verdict.winner === 'p2' ? p2 : null;
  const isDraw = verdict.winner === 'draw';

  return (
    <div className="battle-analysis">
      <div className={`verdict-card ${isDraw ? 'draw' : ''}`}>
        <div className="verdict-header">
          <Zap size={32} className="zap-icon" />
          <div className="verdict-title">
            {isDraw ? (
              <>
                <h4>Equilíbrio de Forças</h4>
                <p>Esta seria uma batalha extremamente acirrada!</p>
              </>
            ) : (
              <>
                <h4>Veredito Final</h4>
                <p><strong>{winner?.name}</strong> possui vantagem estratégica.</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Grid com análise de eficiência de tipos e resumo técnico */}
      <div className="analysis-grid">
        {/* Box exibindo efetividade de tipos de cada pokémon */}
        <div className="analysis-box">
          <div className="box-header">
            <Swords size={20} />
            <h5>Eficiência de Tipos</h5>
          </div>
          <div className="box-content">
            <div className="advantage-row">
              <span className="p-name">{p1.name}</span>
              <span className={`multiplier x${p1Details.effectiveness.toString().replace('.', '_')}`}>
                {p1Details.effectiveness}x dano
              </span>
            </div>
            <div className="advantage-row">
              <span className="p-name">{p2.name}</span>
              <span className={`multiplier x${p2Details.effectiveness.toString().replace('.', '_')}`}>
                {p2Details.effectiveness}x dano
              </span>
            </div>
          </div>
        </div>

        {/* Box com resumo técnico explicando o resultado */}
        <div className="analysis-box full-width">
          <div className="box-header">
            <TrendingUp size={20} />
            <h5>Análise Técnica</h5>
          </div>
          <div className="box-content summary-text">
            <p className="reason-text">{verdict.reason}</p>
          </div>
        </div>
      </div>

      <div className="disclaimer">
        <AlertTriangle size={14} />
        <span>Análise baseada na combinação de Tipagem Elemental e Atributos de Status de Acordo com a API PokéAPI.</span>
      </div>
    </div>
  );
};
