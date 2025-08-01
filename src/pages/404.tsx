import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

// Explicitly cast icon to React component (fix TS error in v5)
const WarningIcon = RiAlarmWarningFill as React.FC<
  React.SVGProps<SVGSVGElement>
>;

export default function NotFoundPage() {
  return (
    <Layout>
      <Seo templateTitle='Not Found' />

      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
            <WarningIcon className='drop-shadow-glow animate-flicker text-red-500' />
            <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
            Back to Home
          </div>
        </section>
      </main>
    </Layout>
  );
}
