import React, { useState } from 'react';
import { shortenUrl } from '../utils/apiClient';
import Loader from './Loader';

function UrlShortenerForm() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE = 'http://localhost:3000';

  const preprocessUrl = (value) => {
    const trimmed = value.trim();

    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }

    if (trimmed.startsWith('www.')) {
      return 'https://' + trimmed;
    }

    return 'https://' + trimmed;
  };

  const validateUrl = (value) => {
    if (!value) {
      setError('Please enter a URL');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortenedUrl('');

    let finalUrl = preprocessUrl(url);

    if (!validateUrl(finalUrl)) return;

    setLoading(true);

    try {
      const data = await shortenUrl(finalUrl);
      setShortenedUrl(`${API_BASE}/${data.short_code}`);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '900px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Inter, sans-serif'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '1.5rem',
        background: 'linear-gradient(to right, #4e54c8, #8f94fb)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: '700'
      }}>
        URL Shortener
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Paste your long URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            borderRadius: '10px',
            border: '1.8px solid #ddd',
            outline: 'none',
            marginBottom: '1rem',
            boxSizing: 'border-box',
            transition: 'border-color 0.3s ease',
          }}
          onFocus={(e) => e.target.style.borderColor = '#4e54c8'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'linear-gradient(to right, #4e54c8, #8f94fb)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
            borderRadius: '10px',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>

      {loading && <Loader />}

      {shortenedUrl && (
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#f0f8ff',
          border: '1px solid #4e54c8',
          borderRadius: '10px',
          textAlign: 'center',
          fontWeight: '600',
          color: '#1a237e',
        }}>
          Shortened URL: <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a>
        </div>
      )}

      {error && (
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#ffe1e6',
          border: '1px solid #f44336',
          borderRadius: '10px',
          color: '#c62828',
          textAlign: 'center',
          fontWeight: '600',
        }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default UrlShortenerForm;
