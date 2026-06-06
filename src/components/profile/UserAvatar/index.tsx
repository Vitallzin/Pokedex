import React from 'react';
import './style.css';

interface UserAvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBorder?: boolean;
}

// Avatar customizável usando dicebear com fallback a gerador de avatares aleatórios
export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  alt = 'User Avatar',
  size = 'md',
  showBorder = true,
}) => {
  // Gera avatar procedural como fallback (baseado em seed)
  const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${alt}`;
  
  return (
    <div className={`avatar-container avatar-${size} ${showBorder ? 'avatar-border' : ''}`}>
      {/* Imagem com fallback para dicebear se src não carregar */}
      <img 
        src={src || defaultAvatar} 
        alt={alt} 
        className="avatar-image"
        onError={(e) => {
          // Se ambas falharem, mostra fallback genérico
          (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${alt}`;
        }}
      />
    </div>
  );
};
