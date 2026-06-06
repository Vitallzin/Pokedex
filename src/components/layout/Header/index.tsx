import React, { useState, useRef, useEffect } from 'react';
import { Menu, User as UserIcon, ChevronDown } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { AccountMenu } from '../../profile/AccountMenu';
import { AccountDetailsModal } from '../../profile/AccountDetailsModal';
import { LogoutConfirmModal } from '../../profile/LogoutConfirmModal';
import './style.css';

interface HeaderProps {
  onMenuClick: () => void;
}

// Cabeçalho com título, menu hambúrguer e seção de usuário (avatar + dropdown)
export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha menu ao clicar fora dele (detecta cliques no documento)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <button onClick={onMenuClick} className="icon-button" aria-label="Menu">
          <Menu size={24} />
        </button>
      </div>
      
      <Link to="/" className="header-title">
        <h1>Pokédex</h1>
      </Link>

      <div className="header-right">
        {isLoading ? (
          <div className="avatar-loading-placeholder" />
        ) : isAuthenticated ? (
          <div className="user-section" ref={menuRef}>
            <button 
              className="user-profile-btn" 
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
            >
              <img src={user?.avatar} alt={user?.name} className="avatar" />
              <span className="user-name-desktop">{user?.name}</span>
              <ChevronDown size={16} className={`chevron ${isAccountMenuOpen ? 'open' : ''}`} />
            </button>
            
            {/* Exibe dropdown de menu de conta quando isAccountMenuOpen é true */}
            {isAccountMenuOpen && (
              <div className="account-menu-dropdown">
                <AccountMenu 
                  onClose={() => setIsAccountMenuOpen(false)} 
                  onOpenAccountDetails={() => setIsAccountModalOpen(true)}
                  onLogoutRequest={() => setIsLogoutModalOpen(true)}
                />
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="login-link">
            <div className="avatar-placeholder">
              <UserIcon size={20} />
            </div>
            <span>Login</span>
          </Link>
        )}
      </div>

        {/* Modais para detalhes da conta e confirmação de logout */}
      <AccountDetailsModal 
        isOpen={isAccountModalOpen} 
        onClose={() => setIsAccountModalOpen(false)} 
      />

      {/* Modal de confirmação de logout que chama logout() do AuthContext ao confirmar */}
      <LogoutConfirmModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {
          logout();
          setIsLogoutModalOpen(false);
        }}
      />
    </header>
  );
};
