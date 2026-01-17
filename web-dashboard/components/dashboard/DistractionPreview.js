'use client';

import { useState } from 'react';
import { getDistractionIcon } from '@/lib/utils/icons';
import ImageModal from './ImageModal';

export default function DistractionPreview({ distraction }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Icon, color } = getDistractionIcon(distraction.classification);

  return (
    <>
      <div
        className="grid grid-cols-4 gap-4 items-center py-2 px-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center">
          <button
            className="p-2 hover:bg-white/10 rounded transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            <Icon className="w-4 h-4" style={{ color }} />
          </button>
        </div>
        <div className="text-sm">{distraction.classification || 'Unknown'}</div>
        <div className="text-sm text-white/70">{distraction.date || 'N/A'}</div>
        <div className="text-sm text-white/70">{distraction.time || 'N/A'}</div>
      </div>

      {isModalOpen && (
        <ImageModal
          distraction={distraction}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
