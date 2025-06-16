import { Analytics } from '@vercel/analytics/react';
import * as React from 'react';

import CustomCursor from '@/components/CustomCursor';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CustomCursor />
      <Analytics />
    </>
  );
}
