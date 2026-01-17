'use client';

import { useMemo } from 'react';
import Chart from './Chart';
import StorageInfoCard from './StorageInfoCard';
import { DEFAULT_PADDING } from '@/lib/constants';
import {
  MessageSquare,
  PhoneCall,
  Radio,
  X,
  ArrowLeft,
  Smile,
  Volume2,
} from 'lucide-react';

const distractionTypes = {
  'Texting': { icon: MessageSquare, color: '#3B82F6' },
  'Talking on the phone': { icon: PhoneCall, color: '#10B981' },
  'Operating the radio': { icon: Radio, color: '#F97316' },
  'Drinking': { icon: X, color: '#EF4444' },
  'Reaching behind': { icon: ArrowLeft, color: '#FBBF24' },
  'Hair and makeup': { icon: Smile, color: '#A855F7' },
  'Talking to passenger': { icon: Volume2, color: '#EC4899' },
};

export default function StorageDetails({ distractions = [] }) {
  // Calculate breakdown from actual distractions
  const breakdown = useMemo(() => {
    const counts = {};
    let total = 0;

    distractions.forEach((distraction) => {
      const type = distraction.classification || 'Unknown';
      counts[type] = (counts[type] || 0) + 1;
      total++;
    });

    // Convert to array and calculate percentages
    return Object.entries(counts)
      .map(([type, count]) => ({
        type,
        count,
        percentage: total > 0 ? (count / total) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count);
  }, [distractions]);

  const chartData = useMemo(() => {
    return breakdown.slice(0, 7).map((item) => {
      const typeInfo = Object.entries(distractionTypes).find(
        ([key]) => item.type.toLowerCase().includes(key.toLowerCase())
      );
      const color = typeInfo ? typeInfo[1].color : '#6B7280'; // Default gray if not found
      
      return {
        name: item.type,
        value: item.percentage,
        color: color,
        count: item.count,
      };
    });
  }, [breakdown]);

  const totalDistractions = distractions.length;

  return (
    <div
      className="bg-secondary rounded-lg p-4"
      style={{ padding: `${DEFAULT_PADDING}px` }}
    >
      <h2 className="text-lg font-semibold mb-4">Distraction Breakdown</h2>
      
      <div className="space-y-4">
        <Chart data={chartData} total={totalDistractions} />
        
        <div className="space-y-2">
          {breakdown.length === 0 ? (
            <p className="text-sm text-white/50 text-center py-4">No distraction data available</p>
          ) : (
            breakdown.map((item, index) => {
              const typeInfo = Object.entries(distractionTypes).find(
                ([key]) => item.type.toLowerCase().includes(key.toLowerCase())
              );
              const Icon = typeInfo ? typeInfo[1].icon : Volume2;
              const color = typeInfo ? typeInfo[1].color : '#6B7280'; // Default gray if not found
              
              return (
                <StorageInfoCard
                  key={index}
                  icon={Icon}
                  title={item.type}
                  count={item.count}
                  percentage={item.percentage}
                  color={color}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
