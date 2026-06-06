import React from 'react';
import './style.css';

// Spinner com animação de pokebola
export const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="pokeball-loader"></div>
    </div>
  );
};
