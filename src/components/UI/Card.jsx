import React from 'react';

const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <div 
      className={`bg-white rounded-xl shadow-sm ${hover ? 'hover:shadow-lg transition-shadow duration-200' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
