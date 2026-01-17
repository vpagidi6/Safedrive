'use client';

import DistractionPreview from './DistractionPreview';
import { DEFAULT_PADDING } from '@/lib/constants';

export default function RecentDrives({ distractions }) {
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
          {distractions.length === 0 ? (
            <div className="text-center py-8 text-white/50">
              No distractions found
            </div>
          ) : (
            distractions.map((distraction, index) => (
              <DistractionPreview key={index} distraction={distraction} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
