'use client';

import { useState, useEffect } from 'react';
import TopNav from './TopNav';
import SideMenu from './SideMenu';
import { isDesktop } from '@/lib/utils/responsive';

export default function MainLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (isDesktop(window.innerWidth)) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleToggleMenu = () => {
      setIsMobileMenuOpen((prev) => !prev);
    };
    window.addEventListener('toggleMobileMenu', handleToggleMenu);
    return () => window.removeEventListener('toggleMobileMenu', handleToggleMenu);
  }, []);

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Top Navigation Bar */}
      <TopNav />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Always visible on desktop, collapsible on mobile */}
        <aside className={`
          ${isDesktop(windowWidth) ? 'w-64' : 'w-0'} 
          ${!isDesktop(windowWidth) && isMobileMenuOpen ? 'fixed inset-y-0 left-0 w-64 z-50' : ''}
          ${!isDesktop(windowWidth) && !isMobileMenuOpen ? 'hidden' : ''}
          flex-shrink-0 border-r border-white/10
          bg-secondary
          transition-all duration-300
        `}>
          <div className="h-full overflow-y-auto">
            <SideMenu onClose={() => setIsMobileMenuOpen(false)} />
          </div>
        </aside>

        {/* Mobile Menu Overlay */}
        {!isDesktop(windowWidth) && isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
