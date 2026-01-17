'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ProfileCard() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 px-3 py-2 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
          VP
        </div>
        <span className="text-sm font-medium hidden sm:block">Vamshi Pagidi</span>
        <ChevronDown className={`w-4 h-4 text-white/70 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-secondary border border-white/10 rounded-lg shadow-lg py-2 z-50">
          <a 
            href="/profile" 
            className="block px-4 py-2 text-sm hover:bg-white/5 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </a>
          <div className="border-t border-white/10 my-2"></div>
          <a 
            href="/logout" 
            className="block px-4 py-2 text-sm hover:bg-white/5 text-red-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Logout
          </a>
        </div>
      )}
    </div>
  );
}
