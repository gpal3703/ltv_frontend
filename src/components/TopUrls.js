import React, { useEffect, useState } from 'react';
import { fetchTopUrls } from '../utils/apiClient';
import Loader from './Loader';

function TopUrls() {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://localhost:3000';

  useEffect(() => {
    const loadTopUrls = async () => {
      try {
        const data = await fetchTopUrls();
        setUrls(data);
      } catch {
        setError('Failed to load top URLs.');
      } finally {
        setLoading(false);
      }
    };
    loadTopUrls();
  }, []);

  if (loading) return <Loader />;

  return (
    <div style={{
      maxWidth: '900px',
      margin: '3rem auto',
      padding: '1.5rem',
      backgroundColor: 'white',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      borderRadius: '12px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}>
      <h2 style={{ color: '#4e54c8', marginBottom: '1rem', textAlign: 'center' }}>Top 100 Most Accessed URLs</h2>
      {error && <div style={{
        padding: '1rem',
        backgroundColor: '#ffe1e6',
        borderRadius: '8px',
        color: '#d32f2f',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: '1rem',
      }}>{error}</div>}

      {!error && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#4e54c8', color: 'white' }}>
              <th className="d-none d-sm-table-cell" style={{ padding: '0.75rem', border: '1px solid #ddd' }}>S.no</th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Title</th>
              <th className="d-none d-sm-table-cell" style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Original URL</th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Shortened URL</th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Click Count</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr
                key={url.id}
                style={{
                  borderBottom: '1px solid #ddd',
                  cursor: 'default',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f4ff'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td className="d-none d-sm-table-cell" style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{url.id}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{url.title}</td>
                <td className="d-none d-sm-table-cell" style={{ padding: '0.75rem', border: '1px solid #ddd', wordBreak: 'break-all' }}>
                  <a href={url.full_url} target="_blank" rel="noreferrer" style={{ color: '#4e54c8' }}>
                    {url.full_url}
                  </a>
                </td>
                <td style={{ padding: '0.75rem', border: '1px solid #ddd', wordBreak: 'break-all' }}>
                  <a href={`${API_BASE}/${url.code}`} target="_blank" rel="noreferrer" style={{ color: '#4e54c8' }}>
                    {`${API_BASE}/${url.code}`}
                  </a>
                </td>
                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{url.click_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TopUrls;
