import React from 'react';
import { PawPrint, UserPlus, LogIn } from 'lucide-react';
import FloatingElements from './FloatingElements';
import BrandMarker from './BrandMarker';

const BackgroundPattern = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="h-full w-full bg-[radial-gradient(#881337_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
  </div>
);

export default function Landing({ onNavigate }) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-red-950 text-white p-4 sm:p-8 font-inter">
      <BackgroundPattern />
      <FloatingElements />

      <div className="relative z-10 bg-red-800 p-8 sm:p-12 rounded-3xl shadow-2xl w-full max-w-2xl transform rotate-1 hover:rotate-0 hover:scale-[1.03] transition-all duration-700 ease-in-out border border-yellow-500/50 shadow-yellow-500/30">
        <div className="h-1 w-20 bg-yellow-400 mx-auto mb-8 rounded-full"></div>
        <PawPrint className="w-16 h-16 text-yellow-400 mx-auto mb-6 drop-shadow-xl" />

        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-center tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
            Wildcat Spheres!
          </span>
        </h1>

        <p className="text-xl text-red-100 mb-10 text-center max-w-xl mx-auto font-light">
          <strong>Gather, Connect, Thrive.</strong> Discover weekend hangouts, meet classmates, and build memories beyond the classroom.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button
            onClick={() => onNavigate('login')}
            className="flex items-center justify-center bg-yellow-500 text-red-900 px-10 py-4 rounded-xl font-extrabold text-lg shadow-xl shadow-yellow-500/60 hover:bg-yellow-400 hover:shadow-yellow-400/80 transform hover:scale-105 transition-all duration-300 uppercase tracking-wider"
          >
            <LogIn className="w-5 h-5 mr-3" /> Login
          </button>

          <button
            onClick={() => onNavigate('register')}
            className="flex items-center justify-center bg-transparent border-2 border-yellow-500 text-yellow-400 px-10 py-4 rounded-xl font-bold text-lg hover:bg-red-700 hover:shadow-lg hover:shadow-yellow-500/40 transform hover:scale-105 transition-all duration-300 uppercase tracking-wider"
          >
            <UserPlus className="w-5 h-5 mr-3" /> Register
          </button>
        </div>

        <p className="mt-12 text-sm text-red-300 text-center">
          Designed for connection, fueled by Wildcat pride.
        </p>
      </div>

      <BrandMarker />
    </div>
  );
}
