
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArtworkDetailPage from './pages/ArtworkDetailPage';
import CreatePage from './pages/CreatePage';
import ProfilePage from './pages/ProfilePage';
import { ToastProvider } from './contexts/ToastContext';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col bg-slate-950 font-sans">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/artwork/:id" element={<ArtworkDetailPage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </ToastProvider>
  );
};

export default App;
