import React, { useState } from 'react';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { BottomNavbar } from '../BottomNavbar';
import './style.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

// Layout principal que envolve toda a aplicação com header, sidebar e navbar
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // Controla abertura/fechamento do sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="main-layout">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="content">
        {children}
      </main>
      <BottomNavbar />
    </div>
  );
};
