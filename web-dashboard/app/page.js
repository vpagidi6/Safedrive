'use client';

import { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import DashboardScreen from '@/components/dashboard/DashboardScreen';
import { subscribeToDistractions } from '@/lib/api/distractions';

export default function Home() {
  const [distractions, setDistractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToDistractions((data) => {
      setDistractions(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <DashboardScreen distractions={distractions} />
    </MainLayout>
  );
}
