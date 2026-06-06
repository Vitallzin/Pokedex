import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Card } from '../../components/common/Card';
import pikachuLogo from '../../assets/Pikachu.webp';
import './style.css';

export const Login: React.FC = () => {
  // Alterna entre login e registro
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register, isLoading } = useAuth();
  const navigate = useNavigate();

  // Executa login ou registro conforme modo ativo
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
      // Redireciona para home após sucesso
      navigate('/');
    } catch {
      setError(isRegister ? 'Erro ao criar conta. Tente novamente.' : 'Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="login-page">
      <Card className="login-card" padding="lg">
        <div className="login-header">
          <img src={pikachuLogo} alt="Pikachu Logo" className="login-logo" />
          <h2>{isRegister ? 'Criar sua Conta' : 'Bem-vindo, Treinador!'}</h2>
          <p>{isRegister ? 'Cadastre-se para começar sua jornada Pokémon.' : 'Faça login para salvar seus favoritos e criar times.'}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {isRegister && (
            <Input 
              label="Nome / Apelido"
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Como quer ser chamado?"
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
            placeholder="Sua senha secreta"
            error={error}
          />
          
          <Button 
            type="submit" 
            size="full" 
            loading={isLoading}
            className="login-submit"
          >
            {isRegister ? 'Criar Conta' : 'Entrar na Jornada'}
          </Button>
        </form>

        <div className="login-footer">
          {isRegister ? (
            <p>Já tem uma conta? <button onClick={() => setIsRegister(false)} className="toggle-auth">Faça Login</button></p>
          ) : (
            <p>Não tem uma conta? <button onClick={() => setIsRegister(true)} className="toggle-auth">Crie uma agora!</button></p>
          )}
        </div>
      </Card>
    </div>
  );
};
