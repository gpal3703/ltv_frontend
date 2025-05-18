const API_BASE = 'http://localhost:3000';

export async function shortenUrl(fullUrl) {
  const response = await fetch(`${API_BASE}/short_urls`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ full_url: fullUrl }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error?.[0] || data.errors?.[0] || 'Something went wrong');
  }

  return data;
}

export async function fetchTopUrls() {
  const response = await fetch(`${API_BASE}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch top URLs');
  }

  return data.urls;
}
