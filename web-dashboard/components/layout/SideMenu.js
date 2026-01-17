'use client';

import { Car } from 'lucide-react';
import MenuItem from './MenuItem';

const menuItems = [
  { title: 'Dashboard', icon: 'layout-dashboard', path: '/' },
  { title: 'Profile', icon: 'user', path: '/profile' },
];

export default function SideMenu({ onClose }) {
  return (
    <div className="h-full flex flex-col">
      {/* Logo/Brand Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Car className="w-6 h-6 text-primary" />
          <span className="text-xl font-semibold text-white">SafeDrive</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider px-3 mb-3">
            Main Menu
          </h3>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <MenuItem
                key={item.title}
                title={item.title}
                icon={item.icon}
                path={item.path}
                onClose={onClose}
              />
            ))}
          </ul>
        </div>
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-white/10">
        <p className="text-xs text-white/50 text-center">
          © 2024 SafeDrive
        </p>
      </div>
    </div>
  );
}
