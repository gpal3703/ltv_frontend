import './App.css';
import React from 'react';
import UrlShortenerForm from './components/UrlShortenerForm';
import TopUrls from './components/TopUrls';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ backgroundColor: '#f9faff', minHeight: '100vh', paddingBottom: '3rem' }}>
      <Header />
      <UrlShortenerForm />
      <TopUrls />
      <Footer />
    </div>
  );
}

export default App;
