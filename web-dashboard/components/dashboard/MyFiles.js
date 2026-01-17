'use client';

import { useState, useEffect, useMemo } from 'react';
import FileInfoCard from './FileInfoCard';
import { DEFAULT_PADDING } from '@/lib/constants';
import { isMobile } from '@/lib/utils/responsive';
import {
  MessageSquare,
  PhoneCall,
  Radio,
  X,
  ArrowLeft,
  Smile,
  Volume2,
} from 'lucide-react';

// Define distraction types with their icons and colors
const DISTRACTION_TYPE_CONFIG = {
  'Texting': { icon: MessageSquare, color: '#3B82F6', key: 'texting' },
  'Talking on the phone': { icon: PhoneCall, color: '#10B981', key: 'talking-phone' },
  'Operating the radio': { icon: Radio, color: '#F97316', key: 'radio' },
  'Drinking': { icon: X, color: '#EF4444', key: 'drinking' },
  'Reaching behind': { icon: ArrowLeft, color: '#FBBF24', key: 'reaching' },
  'Hair and makeup': { icon: Smile, color: '#A855F7', key: 'hair-makeup' },
  'Talking to passenger': { icon: Volume2, color: '#EC4899', key: 'passenger' },
};

export default function MyFiles({ distractions = [] }) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate average distractions per drive
  const averages = useMemo(() => {
    if (!distractions || distractions.length === 0) {
      return [];
    }

    // Group distractions by drive (using date as drive identifier)
    // If you have a drive ID or session ID in your data, use that instead
    const drives = {};
    
    distractions.forEach((distraction) => {
      const driveKey = distraction.date || 'unknown';
      if (!drives[driveKey]) {
        drives[driveKey] = [];
      }
      drives[driveKey].push(distraction);
    });

    const numDrives = Object.keys(drives).length;
    if (numDrives === 0) return [];

    // Count occurrences of each distraction type per drive
    const typeCounts = {};
    
    Object.values(drives).forEach((driveDistractions) => {
      const driveTypeCounts = {};
      driveDistractions.forEach((d) => {
        const type = d.classification || 'Unknown';
        driveTypeCounts[type] = (driveTypeCounts[type] || 0) + 1;
      });
      
      // Add to total counts
      Object.entries(driveTypeCounts).forEach(([type, count]) => {
        if (!typeCounts[type]) {
          typeCounts[type] = [];
        }
        typeCounts[type].push(count);
      });
    });

    // Calculate averages for each type
    const averages = Object.entries(typeCounts).map(([type, counts]) => {
      const sum = counts.reduce((a, b) => a + b, 0);
      const average = sum / numDrives;
      
      // Find matching config
      const configEntry = Object.entries(DISTRACTION_TYPE_CONFIG).find(
        ([key]) => type.toLowerCase().includes(key.toLowerCase())
      );
      
      return {
        title: type,
        averageOccurrencesPerDrive: parseFloat(average.toFixed(2)),
        icon: configEntry ? configEntry[1].icon : Volume2,
        color: configEntry ? configEntry[1].color : '#6B7280',
      };
    });

    // Sort by average (highest first) and limit to top types
    return averages.sort((a, b) => b.averageOccurrencesPerDrive - a.averageOccurrencesPerDrive);
  }, [distractions]);

  const getGridCols = () => {
    if (isMobile(windowWidth)) {
      return windowWidth < 650 ? 'grid-cols-2' : 'grid-cols-4';
    }
    return 'grid-cols-4';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Average Number of Distractions Per Drive
        </h2>
      </div>
      
      {averages.length === 0 ? (
        <div className="text-center py-8 text-white/50">
          No distraction data available to calculate averages
        </div>
      ) : (
        <div
          className={`grid ${getGridCols()} gap-4`}
          style={{ gap: `${DEFAULT_PADDING}px` }}
        >
          {averages.map((item, index) => (
            <FileInfoCard key={index} info={item} />
          ))}
        </div>
      )}
    </div>
  );
}
