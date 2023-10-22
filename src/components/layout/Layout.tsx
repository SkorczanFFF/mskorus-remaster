import { Analytics } from '@vercel/analytics/react';
import * as React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}
