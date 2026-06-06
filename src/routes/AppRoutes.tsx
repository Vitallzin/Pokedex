import { Routes, Route } from 'react-router-dom';
import { Pokedex } from '../pages/Pokedex';
import { PokemonDetails } from '../pages/PokemonDetails';
import { Comparison } from '../pages/Comparison';
import { Favorites } from '../pages/Favorites';
import { Teams } from '../pages/Teams';
import { Login } from '../pages/Login';
import { Settings } from '../pages/Settings';
import { PrivateRoute } from './PrivateRoute';

// Define todas as rotas da aplicação com proteção de páginas autenticadas
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Pokedex />} />
      <Route path="/pokemon/:id" element={<PokemonDetails />} />
      <Route path="/comparison" element={<Comparison />} />
      <Route path="/login" element={<Login />} />
      
      <Route path="/favorites" element={
        <PrivateRoute>
          <Favorites />
        </PrivateRoute>
      } />
      
      <Route path="/teams" element={
        <PrivateRoute>
          <Teams />
        </PrivateRoute>
      } />

      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};
