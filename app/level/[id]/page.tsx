'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import LevelPage from '@/components/LevelPage';
import ConfidencePage from '@/components/ConfidencePage';

export default function Level() {
  const pathname = usePathname();
  const levelId = pathname?.split('/').pop();

  // Render ConfidencePage for level 2, LevelPage for others
  if (levelId === '2') {
    return <ConfidencePage />;
  }

  return <LevelPage />;
} 