import React, { useState } from 'react';
import { Swords, RotateCcw } from 'lucide-react';
import { pokemonService } from '../../services/pokemonService';
import { CompareStats } from '../../components/comparison/CompareStats';
import { BattleAnalysis } from '../../components/comparison/BattleAnalysis';
import { CompareCard } from '../../components/comparison/CompareCard';
import { Loader } from '../../components/common/Loader';
import { Button } from '../../components/common/Button';
import { AutocompleteInput } from '../../components/common/AutocompleteInput';
import type { Pokemon } from '../../types/pokemon';
import './style.css';

export const Comparison: React.FC = () => {
  // Pokémons selecionados para comparação
  const [pokemon1, setPokemon1] = useState<Pokemon | null>(null);
  const [pokemon2, setPokemon2] = useState<Pokemon | null>(null);
  // Inputs de busca
  const [search1, setSearch1] = useState('');
  const [search2, setSearch2] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async () => {
    if (!search1 || !search2) {
      setError('Por favor, informe dois Pokémons para comparar.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Busca os dois pokemons em paralelo para melhor performance
      const [data1, data2] = await Promise.all([
        pokemonService.getPokemonDetail(search1.toLowerCase()),
        pokemonService.getPokemonDetail(search2.toLowerCase())
      ]);

      setPokemon1(data1 as unknown as Pokemon);
      setPokemon2(data2 as unknown as Pokemon);
    } catch (err) {
      console.error('Error fetching pokemons for comparison:', err);
      setError('Um ou mais Pokémons não foram encontrados. Verifique o nome ou número.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPokemon1(null);
    setPokemon2(null);
    setSearch1('');
    setSearch2('');
    setError(null);
  };

  const handleRemove1 = () => {
    setPokemon1(null);
    setSearch1('');
  };

  const handleRemove2 = () => {
    setPokemon2(null);
    setSearch2('');
  };

  return (
    <div className="comparison-page">
      <header className="comparison-header">
        <h1>Comparação de Batalha</h1>
        <p>Analise estatísticas e vantagens entre dois Pokémons</p>
      </header>
      
      <div className="selection-container">
        <div className="search-inputs">
          <AutocompleteInput 
            placeholder="Nome ou número" 
            value={search1}
            onChange={setSearch1}
            onEnter={handleCompare}
            className="search-input"
          />

          <div className="vs-divider">
            <Swords size={24} />
          </div>

          <AutocompleteInput 
            placeholder="Nome ou número" 
            value={search2}
            onChange={setSearch2}
            onEnter={handleCompare}
            className="search-input"
          />
        </div>

        <div className="action-buttons">
          <Button 
            onClick={handleCompare} 
            loading={loading}
            size="lg"
            className="compare-btn"
          >
            Comparar
          </Button>
          
          {(pokemon1 || pokemon2) && (
            <Button 
              variant="ghost" 
              onClick={handleReset}
              icon={<RotateCcw size={18} />}
              className="reset-btn"
            >
              Limpar tudo
            </Button>
          )}
        </div>

        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="comparison-results">
        {loading ? (
          <div className="loading-container">
            <Loader />
            <p>Analisando dados dos Pokémons...</p>
          </div>
        ) : (pokemon1 || pokemon2) ? (
          <div className="results-content">
            <div className="pokemon-cards-grid">
              {pokemon1 ? (
                <CompareCard pokemon={pokemon1} onRemove={handleRemove1} />
              ) : (
                <div className="empty-slot">Aguardando Pokémon 1...</div>
              )}
              
              <div className="vs-large">VS</div>
              
              {pokemon2 ? (
                <CompareCard pokemon={pokemon2} onRemove={handleRemove2} />
              ) : (
                <div className="empty-slot">Aguardando Pokémon 2...</div>
              )}
            </div>

            {pokemon1 && pokemon2 && (
              <>
                <section className="analysis-section">
                  <div className="section-title">
                    <div className="title-line"></div>
                    <h3>Estatísticas Base</h3>
                    <div className="title-line"></div>
                  </div>
                  <CompareStats p1={pokemon1} p2={pokemon2} />
                </section>

                <section className="analysis-section">
                  <div className="section-title">
                    <div className="title-line"></div>
                    <h3>Análise de Tipo e Fraquezas</h3>
                    <div className="title-line"></div>
                  </div>
                  <BattleAnalysis p1={pokemon1} p2={pokemon2} />
                </section>
              </>
            )}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <Swords size={48} />
            </div>
            <h3>Pronto para o duelo?</h3>
            <p>Insira o nome ou número de dois Pokémons acima para ver uma análise detalhada.</p>
          </div>
        )}
      </div>
    </div>
  );
};
