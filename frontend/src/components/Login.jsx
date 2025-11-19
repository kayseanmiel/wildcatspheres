import React, { useState } from 'react';
import FloatingElements from './FloatingElements';
import BrandMarker from './BrandMarker';

export default function Login({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email, password }),
      });
      const msg = await res.text();
      if (msg.includes('successful')) {
        localStorage.setItem('userEmail', email);
        onNavigate('home');
      } else {
        alert(msg);
      }
    } catch (err) {
      console.error(err);
      alert('Login failed. Try again.');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-red-950 text-white p-4 sm:p-8 font-inter">
      <FloatingElements />

      <div className="relative z-10 bg-red-800 rounded-3xl shadow-2xl p-10 w-full max-w-md transform rotate-1 hover:rotate-0 hover:scale-[1.03] transition-all duration-700 ease-in-out border border-yellow-500/50 shadow-yellow-500/30">
        <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
          Login
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-yellow-500/50 p-3 rounded-lg bg-red-900 text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-yellow-500/50 p-3 rounded-lg bg-red-900 text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="bg-yellow-500 text-red-900 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-red-200">
          Don't have an account?{' '}
          <button
            onClick={() => onNavigate('register')}
            className="text-yellow-400 font-semibold hover:underline"
          >
            Register
          </button>
        </p>
      </div>

      <BrandMarker />
    </div>
  );
}
