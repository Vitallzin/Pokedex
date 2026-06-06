import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, GitCompare, Heart, Users } from 'lucide-react';
import './style.css';

// Navegação mobile/desktop com links para principais páginas
export const BottomNavbar: React.FC = () => {
  return (
    <nav className="bottom-navbar">
      {/* Link para pokédex ativo quando em "/" */}
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Search size={24} />
        <span>Pokédex</span>
      </NavLink>
      {/* Link para comparação */}
      <NavLink to="/comparison" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <GitCompare size={24} />
        <span>Comparar</span>
      </NavLink>
      {/* Link para favoritos */}
      <NavLink to="/favorites" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Heart size={24} />
        <span>Favoritos</span>
      </NavLink>
      {/* Link para times */}
      <NavLink to="/teams" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Users size={24} />
        <span>Meu Time</span>
      </NavLink>
    </nav>
  );
};
