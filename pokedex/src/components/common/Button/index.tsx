import React, { type ButtonHTMLAttributes } from 'react';
import './style.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'full';
  loading?: boolean;
  icon?: React.ReactNode;
}

// Componente de botão reutilizável com variantes, tamanhos e estado de loading
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className} ${loading ? 'btn-loading' : ''}`}
      disabled={disabled || loading}
      {...props}
    >
      {/* Spinner enquanto loading */}
      {loading ? (
        <span className="btn-spinner"></span>
      ) : (
        <>
          {icon && <span className="btn-icon">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};
