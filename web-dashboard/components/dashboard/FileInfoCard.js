'use client';

import { DEFAULT_PADDING } from '@/lib/constants';

export default function FileInfoCard({ info }) {
  const IconComponent = info.icon;

  return (
    <div
      className="bg-secondary rounded-lg p-4 flex flex-col items-center justify-between min-h-[120px]"
      style={{ padding: `${DEFAULT_PADDING}px` }}
    >
      <div className="flex flex-col items-center gap-2">
        <IconComponent
          className="w-8 h-8"
          style={{ color: info.color }}
        />
        <h3 className="text-sm font-bold text-center">{info.title}</h3>
        <p className="text-2xl font-bold">{info.averageOccurrencesPerDrive}</p>
      </div>
    </div>
  );
}
