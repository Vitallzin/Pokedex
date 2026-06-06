import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { Camera, Save, Lock } from 'lucide-react';
import './style.css';

interface AccountDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Modal para editar perfil do usuário: nome, avatar e senha
export const AccountDetailsModal: React.FC<AccountDetailsModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUser, isLoading } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Atualiza nome e avatar do perfil
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      await updateUser({ name, avatar });
      setSuccess('Perfil atualizado com sucesso!');
    } catch {
      setError('Erro ao atualizar perfil.');
    }
  };

  // Valida e redefine senha
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    // Validações básicas
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (newPassword.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    // Em um app real, chamaria uma API para atualizar senha
    setSuccess('Senha redefinida com sucesso!');
    setNewPassword('');
    setConfirmPassword('');
  };

  // Gera novo avatar aleatório
  const generateNewAvatar = () => {
    const newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`;
    setAvatar(newAvatar);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Detalhes da Conta"
      size="md"
    >
      <div className="account-details-container">
        <section className="account-details-section">
          <h3>Informações Pessoais</h3>
          <form onSubmit={handleUpdateProfile} className="account-details-form">
            <div className="avatar-edit-container">
              <div className="avatar-wrapper">
                <img src={avatar} alt={name} className="large-avatar" />
                <button type="button" className="change-avatar-btn" onClick={generateNewAvatar} title="Mudar avatar">
                  <Camera size={20} />
                </button>
              </div>
              <p className="avatar-hint">Clique na câmera para gerar um novo avatar.</p>
            </div>

            <Input 
              label="Nome / Apelido"
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
            />

            <Input 
              label="E-mail"
              type="email" 
              value={user?.email || ''}
              disabled
              placeholder="treinador@poke.com"
            />

            <Button 
              type="submit" 
              loading={isLoading}
              icon={<Save size={18} />}
            >
              Salvar Alterações
            </Button>
          </form>
        </section>

        <div className="account-details-divider" />

        <section className="account-details-section">
          <h3>Redefinir Senha</h3>
          <form onSubmit={handleResetPassword} className="account-details-form">
            <Input 
              label="Nova Senha"
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Digite a nova senha"
            />

            <Input 
              label="Confirmar Nova Senha"
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme a nova senha"
              error={error}
            />

            {success && <p className="success-message">{success}</p>}

            <Button 
              type="submit" 
              variant="secondary"
              icon={<Lock size={18} />}
            >
              Alterar Senha
            </Button>
          </form>
        </section>
      </div>
    </Modal>
  );
};
