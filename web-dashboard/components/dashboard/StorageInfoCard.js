'use client';

import { DEFAULT_PADDING } from '@/lib/constants';

export default function StorageInfoCard({ icon: Icon, title, count, percentage, color = '#2697FF' }) {
  return (
    <div
      className="rounded-lg p-4 flex items-center justify-between gap-4 transition-all hover:bg-white/5"
      style={{
        marginTop: `${DEFAULT_PADDING}px`,
        padding: `${DEFAULT_PADDING}px`,
        border: `2px solid ${color}40`, // 40 = 25% opacity in hex
        backgroundColor: `${color}10`, // 10 = 6% opacity in hex
      }}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Icon 
          className="w-5 h-5 flex-shrink-0" 
          style={{ color: color }}
        />
        <span className="text-sm truncate">{title}</span>
      </div>
      {(count !== undefined || percentage !== undefined) && (
        <div className="flex items-center gap-2 flex-shrink-0">
          {count !== undefined && (
            <span className="text-xs text-white/70">({count})</span>
          )}
          {percentage !== undefined && (
            <span 
              className="text-xs font-semibold"
              style={{ color: color }}
            >
              {percentage.toFixed(1)}%
            </span>
          )}
        </div>
      )}
    </div>
  );
}
