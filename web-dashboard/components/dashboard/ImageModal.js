'use client';

import { X } from 'lucide-react';

export default function ImageModal({ distraction, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="bg-secondary rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-bold">Image of Driving Distraction</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded transition-colors"
          >
            <X className="w-5 h-5 text-red-400" />
          </button>
        </div>

        {/* Image */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
          {distraction.image ? (
            <img
              src={distraction.image}
              alt="Distraction"
              className="max-w-full max-h-[600px] object-contain rounded"
            />
          ) : (
            <div className="text-white/50">No image available</div>
          )}
        </div>
      </div>
    </div>
  );
}
