import React from 'react';

export default function Header() {
  return (
    <header style={{
      background: 'linear-gradient(90deg, #4e54c8, #8f94fb)', 
      color: 'white', 
      padding: '1.5rem 0',
      boxShadow: '0 4px 12px rgb(0 0 0 / 0.15)',
      textAlign: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      letterSpacing: '2px',
      fontWeight: '700',
      fontSize: '2rem',
      userSelect: 'none'
    }}>
      URL Shortener App 🚀
    </header>
  );
}
