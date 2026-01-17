'use client';

import { useState, useEffect } from 'react';
import { Menu, Bell } from 'lucide-react';
import ProfileCard from '../dashboard/ProfileCard';
import { isDesktop } from '@/lib/utils/responsive';

export default function TopNav() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuClick = () => {
    const event = new CustomEvent('toggleMobileMenu');
    window.dispatchEvent(event);
  };

  return (
    <header className="bg-secondary border-b border-white/10 sticky top-0 z-30">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {!isDesktop(windowWidth) && (
              <button
                onClick={handleMenuClick}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <h1 className="text-xl font-semibold">SafeDrive Dashboard</h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button
              className="p-2 hover:bg-white/5 rounded-lg transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <ProfileCard />
          </div>
        </div>
      </div>
    </header>
  );
}
