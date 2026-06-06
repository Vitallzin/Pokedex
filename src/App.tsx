import { BrowserRouter } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { AppRoutes } from './routes/AppRoutes';
import './styles/global.css';

// Componente raiz da aplicação com roteamento e layout principal
function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        {/* Renderiza rotas definidas em AppRoutes */}
        <AppRoutes />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
