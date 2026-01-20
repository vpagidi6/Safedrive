'use client';

import { useMemo } from 'react';
import DistractionPreview from './DistractionPreview';
import { DEFAULT_PADDING } from '@/lib/constants';

export default function RecentDrives({ distractions }) {
  // Sort distractions by date and time (newest first)
  const sortedDistractions = useMemo(() => {
    if (!distractions || distractions.length === 0) {
      return [];
    }

    return [...distractions].sort((a, b) => {
      // Parse date from MM/DD/YYYY format
      const parseDate = (dateStr) => {
        if (!dateStr) return new Date(0); // Return epoch if no date
        const [month, day, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
      };

      // Parse time from HH:MM:SS format
      const parseTime = (timeStr) => {
        if (!timeStr) return 0;
        const [hours, minutes, seconds] = timeStr.split(':').map(Number);
        return hours * 3600 + minutes * 60 + (seconds || 0);
      };

      // Compare dates first
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      
      if (dateA.getTime() !== dateB.getTime()) {
        // If dates are different, sort by date (newest first)
        return dateB.getTime() - dateA.getTime();
      }

      // If dates are the same, sort by time (newest first)
      const timeA = parseTime(a.time);
      const timeB = parseTime(b.time);
      
      return timeB - timeA;
    });
  }, [distractions]);

  return (
    <div
      className="bg-secondary rounded-lg p-4"
      style={{ padding: `${DEFAULT_PADDING}px` }}
    >
      <h2 className="text-lg font-semibold mb-4">Recent Drives</h2>
      
      <div className="space-y-2">
        {/* Header Row */}
        <div className="grid grid-cols-4 gap-4 pb-2 border-b border-white/10 text-sm text-white/70">
          <div>Click to see Image</div>
          <div>Type of Distraction</div>
          <div>Date</div>
          <div>Time</div>
        </div>

        {/* Distractions List */}
        <div className="max-h-[400px] overflow-y-auto space-y-1">
          {sortedDistractions.length === 0 ? (
            <div className="text-center py-8 text-white/50">
              No distractions found
            </div>
          ) : (
            sortedDistractions.map((distraction, index) => (
              <DistractionPreview key={index} distraction={distraction} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
