import Link from 'next/link';
import React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

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
            <WarningIcon className='text-red-500' />
            <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
            <Link
              href='/'
              className='mt-4 text-lg text-blue-600 underline hover:text-blue-800'
            >
              Back to Home
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
