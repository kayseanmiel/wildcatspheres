import React, { useState } from 'react';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

export default function App() {
  const [page, setPage] = useState('landing');

  const navigate = (to) => setPage(to);

  return (
    <>
      {page === 'landing' && <Landing onNavigate={navigate} />}
      {page === 'login' && <Login onNavigate={navigate} />}
      {page === 'register' && <Register onNavigate={navigate} />}
      {page === 'home' && <Home />}
    </>
  );
}
