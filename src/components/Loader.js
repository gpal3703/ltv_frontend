import React from 'react';

export default function Loader() {
  return (
    <div style={{ textAlign: 'center', margin: '2rem 0' }}>
      <div style={{
        display: 'inline-block',
        width: '3rem',
        height: '3rem',
        border: '4px solid #8f94fb',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        boxShadow: '0 0 8px #8f94fb'
      }} />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
