import React, { useState } from 'react';
import { X, Settings, LogOut, User, Home, LogIn } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { AccountDetailsModal } from '../../profile/AccountDetailsModal';
import { LogoutConfirmModal } from '../../profile/LogoutConfirmModal';
import { Link } from 'react-router-dom';
import './style.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sidebar com menu de navegação, perfil e opções de conta
export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { logout, isAuthenticated } = useAuth();
  // Controla abertura do modal de detalhes da conta
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  // Controla abertura do modal de confirmação de logout
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Executa logout e fecha sidebbar
  const handleLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    onClose();
  };

  return (
    <>
      {/* Overlay que fecha sidebar ao clicar fora */}
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button onClick={onClose} className="icon-button">
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link to="/" className="sidebar-item" onClick={onClose}>
            <Home size={20} />
            <span>Início</span>
          </Link>

          <Link to="/settings" className="sidebar-item" onClick={onClose}>
            <Settings size={20} />
            <span>Configurações</span>
          </Link>

          {isAuthenticated ? (
            <button 
              className="sidebar-item" 
              onClick={() => {
                setIsAccountModalOpen(true);
              }}
            >
              <User size={20} />
              <span>Detalhes da conta</span>
            </button>
          ) : (
            <Link to="/login" className="sidebar-item" onClick={onClose}>
              <LogIn size={20} />
              <span>Login</span>
            </Link>
          )}

          {isAuthenticated && (
            <button className="sidebar-item logout" onClick={() => setIsLogoutModalOpen(true)}>
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          )}
        </nav>
      </aside>

      <AccountDetailsModal 
        isOpen={isAccountModalOpen} 
        onClose={() => {
          setIsAccountModalOpen(false);
          onClose();
        }} 
      />

      <LogoutConfirmModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};
