import React from 'react';
import { PawPrint } from 'lucide-react';

export default function BrandMarker() {
  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-2 bg-red-900/80 backdrop-blur-md text-yellow-400 px-4 py-2 rounded-full shadow-lg z-50 cursor-default select-none">
      <PawPrint className="w-5 h-5" />
      <span className="font-bold tracking-wide text-sm sm:text-base">Wildcat Spheres</span>
    </div>
  );
}
