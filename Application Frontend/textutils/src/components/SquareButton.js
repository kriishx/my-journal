import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SquareButton({ title, preview, entryId }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/journal/${entryId}`)}
      className="d-flex flex-column justify-content-start align-items-stretch p-0"
      style={{
        width: '300px',
        height: '300px',
        backgroundColor: '#dee2e6',
        border: '2px solid #7a23b5',
        borderRadius: '1rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <div
        style={{
          width: '100%',
          backgroundColor: '#e6ccff',
          padding: '0.75rem 1rem',
          borderBottom: '1px solid #7a23b5',
        }}
      >
        <h5 className="mb-0" style={{ fontWeight: 'bold' }}>
          {title}
        </h5>
      </div>

      <div
        className="px-3 py-2"
        style={{
          textAlign: 'justify',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 9,
          WebkitBoxOrient: 'vertical',
          fontSize: '0.95rem',
        }}
      >
        {preview}
      </div>
    </button>
  );
}
