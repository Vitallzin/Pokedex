import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import pikachuLogo from '../../../assets/Pikachu.webp';
import './style.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Modal para login ou registro de usuário
export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  // Alterna entre modos login e registro
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register, isLoading } = useAuth();

  // Executa login ou registro conforme modo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Valida campos obrigatórios
    if (!email || !password || (isRegister && !name)) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      if (isRegister) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      onClose();
    } catch (err) {
      setError(isRegister ? 'Erro ao criar conta.' : 'Credenciais inválidas.');
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={isRegister ? 'Crie sua Conta' : 'Bem-vindo de volta!'}
      size="sm"
    >
      <form onSubmit={handleSubmit} className="login-modal-form">
        <div className="login-modal-header">
          <img src={pikachuLogo} alt="Pikachu" className="login-modal-logo" />
          <p className="login-modal-subtitle">
            {isRegister ? 'Cadastre-se para salvar seu progresso.' : 'Faça login para acessar seus favoritos e times.'}
          </p>
        </div>
        
        {isRegister && (
          <Input 
            label="Nome / Apelido"
            type="text" 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
          />
        )}
        
        <Input 
          label="E-mail"
          type="email" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="treinador@poke.com"
        />

        <Input 
          label="Senha"
          type="password" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Sua senha"
          error={error}
        />
        
        <Button 
          type="submit" 
          size="full" 
          loading={isLoading}
          className="login-modal-submit"
        >
          {isRegister ? 'Cadastrar' : 'Entrar'}
        </Button>

        <div className="login-modal-footer">
          {isRegister ? (
            <p>Já tem conta? <button type="button" onClick={() => setIsRegister(false)} className="toggle-auth-modal">Login</button></p>
          ) : (
            <p>Novo por aqui? <button type="button" onClick={() => setIsRegister(true)} className="toggle-auth-modal">Criar conta</button></p>
          )}
        </div>
      </form>
    </Modal>
  );
};
