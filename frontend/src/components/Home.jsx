import React, { useEffect, useState } from 'react';
import FloatingElements from './FloatingElements';
import BrandMarker from './BrandMarker';

export default function Home() {
  const [userName, setUserName] = useState('');
  const [events] = useState([
    { id: 1, title: "Coffee Study Session", time: "Sat 10AM", location: "Brew Cafe" },
    { id: 2, title: "Volleyball Meet", time: "Sun 3PM", location: "CIT-U Court" },
    { id: 3, title: "Art Jam", time: "Sat 1PM", location: "Room 305" },
  ]);

  useEffect(() => {
    const name = localStorage.getItem('userFullName') || localStorage.getItem('userEmail');
    setUserName(name);
  }, []);

  return (
    <div className="relative min-h-screen bg-red-950 text-white p-8 font-inter">
      <FloatingElements />

      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center text-yellow-400">
        Welcome{userName ? `, ${userName}` : ''}!
      </h1>

      <h2 className="text-2xl text-red-200 mb-10 text-center">
        Weekend Hangouts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {events.map((e) => (
          <div
            key={e.id}
            className="bg-red-800/90 p-6 rounded-3xl shadow-2xl border border-yellow-500/50 transform hover:scale-105 transition-transform duration-300"
          >
            <h2 className="text-2xl font-bold mb-2 text-yellow-300">{e.title}</h2>
            <p className="text-red-200 mb-1"><strong>Time:</strong> {e.time}</p>
            <p className="text-red-200"><strong>Location:</strong> {e.location}</p>
          </div>
        ))}
      </div>

      <BrandMarker />
    </div>
  );
}
