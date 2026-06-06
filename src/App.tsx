import { BrowserRouter } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { AppRoutes } from './routes/AppRoutes';
import { ThemeProvider } from './contexts/ThemeContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { TeamProvider } from './contexts/TeamContext';
import { useAuth } from './contexts/AuthContext';
import './styles/global.css';

/**
 * Componente interno que consome o contexto de autenticação para 
 * injetar o ID do usuário como chave nos provedores dependentes.
 * Isso garante que Favoritos e Times sejam resetados/recarregados 
 * automaticamente quando o usuário mudar.
 */
function AppContent() {
  const { user } = useAuth();

  return (
    <ThemeProvider>
      <FavoritesProvider key={user?.id}>
        <TeamProvider key={user?.id}>
          <BrowserRouter>
            <MainLayout>
              <AppRoutes />
            </MainLayout>
          </BrowserRouter>
        </TeamProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

// Componente raiz da aplicação
function App() {
  return <AppContent />;
}

export default App;
