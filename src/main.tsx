import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* AuthProvider envolve a aplicação toda para prover o estado de login */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
