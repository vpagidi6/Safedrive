'use client';

import { useState, useEffect } from 'react';
import MyFiles from './MyFiles';
import RecentDrives from './RecentDrives';
import StorageDetails from './StorageDetails';
import { isMobile } from '@/lib/utils/responsive';
import { DEFAULT_PADDING } from '@/lib/constants';

export default function DashboardScreen({ distractions }) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mobile = isMobile(windowWidth);

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-white/70">Monitor and analyze driving distractions</p>
      </div>
      
      {/* Main Content Grid */}
      <div className={`grid gap-6 ${mobile ? 'grid-cols-1' : 'grid-cols-12'}`}>
        {/* Main Content Area */}
        <div className={`${mobile ? 'col-span-1' : 'col-span-8'}`}>
          <div className="space-y-6">
            <MyFiles distractions={distractions} />
            <RecentDrives distractions={distractions} />
          </div>
        </div>

        {/* Sidebar - Desktop Only */}
        {!mobile && (
          <div className="col-span-4">
            <StorageDetails distractions={distractions} />
          </div>
        )}

        {/* Mobile: Show Storage Details below */}
        {mobile && (
          <div className="col-span-1">
            <StorageDetails distractions={distractions} />
          </div>
        )}
      </div>
    </div>
  );
}
