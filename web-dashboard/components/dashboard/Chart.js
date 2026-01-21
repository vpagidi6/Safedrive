'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function Chart({ data = [], total = 0 }) {
  // If no data, show empty state
  if (!data || data.length === 0) {
    return (
      <div className="relative" style={{ height: '200px' }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-semibold">0</div>
          <div className="text-sm text-white/70">events</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ height: '200px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            startAngle={-90}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-3xl font-semibold">{total}</div>
        <div className="text-sm text-white/70">events</div>
      </div>
    </div>
  );
}
