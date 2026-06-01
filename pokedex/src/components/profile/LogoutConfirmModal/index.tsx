import React from 'react';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';
import { LogOut, AlertCircle } from 'lucide-react';
import './style.css';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

// Modal de confirmação antes de logout com advertência
export const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Sair da Conta"
      size="sm"
    >
      <div className="logout-confirm-container">
        {/* Header com ícone de aviso */}
        <div className="logout-confirm-header">
          <div className="warning-icon-wrapper">
            <AlertCircle size={32} className="warning-icon" />
          </div>
          <h3>Deseja realmente sair?</h3>
        </div>
        
        {/* Mensagem explicando o que acontece ao sair */}
        <div className="logout-confirm-body">
          <p>Ao sair, você precisará fazer login novamente para acessar seus Pokémons favoritos e seus times personalizados.</p>
        </div>
        
        {/* Botões de ação */}
        <div className="logout-confirm-footer">
          {/* Cancela logout */}
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="cancel-btn"
          >
            Continuar Logado
          </Button>
          {/* Confirma logout */}
          <Button 
            variant="danger" 
            onClick={onConfirm}
            icon={<LogOut size={18} />}
            className="confirm-logout-btn"
          >
            Sair Agora
          </Button>
        </div>
      </div>
    </Modal>
  );
};
