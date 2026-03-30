import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomButton({ text, imageSrc, to, className = '', style = {} }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`d-flex align-items-center gap-3 px-5 py-3 rounded ${className}`}
      style={{
        backgroundColor: '#dee2e6',
        color: '#000000',
        border: '2px solid #7a23b5',
        fontWeight: '600',
        fontSize: '1.25rem', // Increased font size
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        transform: 'scale(1)',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt="icon"
          style={{ width: '32px', height: '32px' }} // Increased icon size
        />
      )}
      <span>{text}</span>
    </button>
  );
}
