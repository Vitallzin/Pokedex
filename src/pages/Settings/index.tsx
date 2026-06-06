import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { AccountDetailsModal } from '../../components/profile/AccountDetailsModal';
import { LogoutConfirmModal } from '../../components/profile/LogoutConfirmModal';
import { Moon, Sun, User, Bell, Shield, Info, LogOut, Users } from 'lucide-react';
import './style.css';

export const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  // Controla abertura/fechamento dos modais
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>Configurações</h2>
        <p>Gerencie sua conta e preferências do aplicativo.</p>
      </div>

      <div className="settings-content">
        <section className="settings-section">
          <h3>Aparência</h3>
          <Card padding="none">
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-icon">{theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}</div>
                <div>
                  <span className="setting-label">Tema Escuro</span>
                  <p className="setting-description">Alternar entre tema claro e escuro.</p>
                </div>
              </div>
              <button 
                className={`toggle-switch ${theme === 'dark' ? 'active' : ''}`} 
                onClick={toggleTheme}
              >
                <div className="toggle-handle" />
              </button>
            </div>
          </Card>
        </section>

        <section className="settings-section">
          <h3>Conta</h3>
          <Card padding="none">
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-icon"><User size={20} /></div>
                <div>
                  <span className="setting-label">Perfil</span>
                  <p className="setting-description">{user ? user.name : 'Não logado'}</p>
                </div>
              </div>
              {user && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsAccountModalOpen(true)}
                >
                  Editar
                </Button>
              )}
            </div>
            <div className="setting-divider" />
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-icon"><Bell size={20} /></div>
                <div>
                  <span className="setting-label">Notificações</span>
                  <p className="setting-description">Gerenciar alertas e avisos.</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Configurar</Button>
            </div>
          </Card>
        </section>

        <section className="settings-section">
          <h3>Sobre</h3>
          <Card padding="none">
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-icon"><Info size={20} /></div>
                <div>
                  <span className="setting-label">Versão do App</span>
                  <p className="setting-description">v0.4.5</p>
                </div>
              </div>
            </div>
            <div className="setting-divider" />
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-icon"><Shield size={20} /></div>
                <div>
                  <span className="setting-label">Termos e Privacidade</span>
                  <p className="setting-description">Leia nossas políticas.</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="settings-section">
          <h3>Equipe</h3>
          <Card padding="none">
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-icon"><Users size={20} /></div>
                <div>
                  <span className="setting-label">Desenvolvedores</span>
                  <p className="setting-description">Alex Ricardo, Almir Jr., Cauã Vital, Eduardo Vinícius</p>
                  <p className="setting-description">Gabriel Cesar, João Victor, José Bruno</p>
                </div>
              </div>
            </div>
          </Card>
        </section>
        
        

        {user && (
          <div className="logout-section">
            <Button 
              variant="danger" 
              size="full" 
              onClick={() => setIsLogoutModalOpen(true)} 
              icon={<LogOut size={20} />}
            >
              Sair da Conta
            </Button>
          </div>
        )}
      </div>

      <AccountDetailsModal 
        isOpen={isAccountModalOpen} 
        onClose={() => setIsAccountModalOpen(false)} 
      />

      <LogoutConfirmModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {
          logout();
          setIsLogoutModalOpen(false);
        }}
      />
    </div>
  );
};
