'use client';

import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Settings,
} from 'lucide-react';

const iconMap = {
  'layout-dashboard': LayoutDashboard,
  'user': User,
  'settings': Settings,
};

export default function MenuItem({ title, icon, path, onClose }) {
  const pathname = usePathname();
  const isActive = pathname === path;
  const IconComponent = iconMap[icon] || LayoutDashboard;

  const handleClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <li>
      <a
        href={path}
        onClick={handleClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          isActive
            ? 'bg-primary/20 text-white'
            : 'text-white/70 hover:bg-white/5 hover:text-white'
        }`}
      >
        <IconComponent className="w-4 h-4" />
        <span className="text-sm">{title}</span>
      </a>
    </li>
  );
}
